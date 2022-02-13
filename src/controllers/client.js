const { Client } = require('../models');

const createClient = async (req, res) => {
    try {
        const { name, internalCode, taxId, currency, quota, bankRegisters } = req.body

        const newClient = {
            name,
            internalCode,
            taxId,
            currency,
            quota,
            bankRegisters
        }
        await Client.create(newClient)
        return res.status(201).json({
            message: "Successfully registered client",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateClient = async (req, res) => {
    try {
        const { taxId, currency } = req.body;
        const client = req.client;
        let update = new Object();

        if (taxId) {
            update.taxId = taxId;
        }
        if (currency) {
            update.currency = currency;
        }

        client.update(update);
        client.save();
        return res.status(200).json({
            message: "Successfully updated client",
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    createClient,
    updateClient
}