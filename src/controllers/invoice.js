const boom = require("boom");
const moment = require('moment');
const { Op } = require('sequelize');
const { Invoice } = require('../models');
const convertService = require("../services/convert");

const getAllInvoices = async (req, res) => {
    try {
        const { client } = req;
        const { vendorId, startDate, endDate } = req.query;
        const limit = req.query.limit ? + req.query.limit : 10;
        const offset = req.query.page ? + (req.query.page - 1) * limit : 0;
        let currency = req.query.currency || client.currency;

        const { filterInvoices, totalInvoices } = await getFilterInvoices(vendorId, startDate, endDate, limit, offset);
        const listCurrencies = [...new Set(filterInvoices.map((inv) => { return inv.currency; }))];
        await loadPrices(listCurrencies, currency);
        const listInvoices = await getInvoiceswithConvert(filterInvoices, currency);

        const result = {
            total: totalInvoices,
            total_page: Math.ceil(totalInvoices / limit),
            limit,
            page: offset + 1,
            data: listInvoices
        }
        return res.status(200).json({ result });
    } catch (error) {
        throw boom.boomify(error);
    }
}

const getFilterInvoices = async (vendorId, startDate, endDate, limit, offset) => {
    const where = {};
    if (vendorId || (startDate && endDate)) {
        where[Op.and] = [];
        if (vendorId) {
            where[Op.and].push({
                vendorId
            })
        }
        if (startDate && endDate) {
            where[Op.and].push({
                date: {
                    [Op.between]: [
                        moment(startDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
                        moment(endDate, "YYYY-MM-DD").format("YYYY-MM-DD")],
                }
            })
        }
    }

    const invoice = await Invoice.findAndCountAll({
        attributes: ['id', 'vendorId', 'number', 'total', 'paymentTotal', 'creditTotal', 'bankId', 'currency'],
        limit,
        offset,
        where,
    });

    return { filterInvoices: invoice.rows, totalInvoices: invoice.count }
}

const loadPrices = async (listCurrencies, newCurrency) => {
    await Promise.all(listCurrencies.map(async (curr) => {
        try {
            if (curr !== newCurrency) {
                await convertService.getPriceConvert(curr + '_' + newCurrency);
            }
        } catch (error) {
            return { error: error };
        }
    }));
}

const getInvoiceswithConvert = async (Invoices, newCurrency) => {
    let listInvoices = [];
    await Promise.all(Invoices.map(async (inv) => {
        try {
            const { currency, ...invoice } = inv.dataValues;
            let price = 1;

            if (currency !== newCurrency) {
                price = await convertService.getPriceConvert(currency + '_' + newCurrency);
            }

            const getInvoice = {
                ...invoice,
                total: Number(invoice.total * price).toFixed(2),
                paymentTotal: Number(invoice.paymentTotal * price).toFixed(2),
                creditTotal: Number(invoice.creditTotal * price).toFixed(2),
            }

            listInvoices.push(getInvoice);
        } catch (error) {
            return { error: error };
        }
    }));

    return listInvoices.sort((a, b) => a.id - b.id);
}

module.exports = {
    getAllInvoices
}