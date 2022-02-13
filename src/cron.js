const cron = require('node-cron');
const request = require('request');
const boom = require("boom");
const moment = require('moment');
const { parse } = require('csv-parse');
const { Invoice } = require('./models');
const { Op } = require('sequelize');

cron.schedule(process.env.CRONTIMERCSV, async () => {
    console.log('Sync invoices.csv with database');
    const invoices = await Invoice.findAll({
        where: {
            createdAt: { [Op.gte]: moment().startOf('day') }
        }
    });
    if (invoices.length == 0) {
        request.get(process.env.CSVINVOICE, function (err, res, body) {
            let list_invoices = [];
            parse(res.body, {
                columns: true,
                skip_empty_lines: true
            }).on("data", async function (row) {
                const invoice = {
                    id: Number(row['INVOICE_ID']),
                    vendorId: Number(row['VENDOR_ID']),
                    number: row['INVOICE_NUMBER'],
                    date: moment(row['INVOICE_DATE'], "DD-MMM-YYYY").format("YYYY-MM-DD"),
                    total: parseFloat(row['INVOICE_TOTAL']),
                    paymentTotal: parseFloat(row['PAYMENT_TOTAL']),
                    creditTotal: parseFloat(row['CREDIT_TOTAL']),
                    bankId: Number(row['BANK_ID']),
                    dueDate: moment(row['INVOICE_DUE_DATE'], "DD-MMM-YYYY").format("YYYY-MM-DD"),
                    paymentDate: row['PAYMENT_DATE'] ? moment(row['PAYMENT_DATE'], "DD-MMM-YYYY").format("YYYY-MM-DD") : null,
                    currency: row['CURRENCY']
                }
                list_invoices.push(invoice)
            }).on("end", function () {
                Invoice.destroy({ truncate: true })
                    .then(() => {
                        console.log("Truncate Invoices table");
                        Invoice.bulkCreate(list_invoices)
                            .then(() => {
                                console.log("Uploaded the Invoices table with file successfully.");
                            })
                            .catch((error) => {
                                console.log("Fail to import data into database: " + error.message);
                            });
                    })
                    .catch((error) => {
                        console.log("Fail to truncate Invoices table: " + error.message);
                    });
            }).on("error", function (error) {
                throw boom.boomify(error);
            });
        });
    }
}, {
    scheduled: true
});