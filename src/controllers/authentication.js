const jwt = require("jsonwebtoken");
const { Client } = require('../models');

const createToken = async (req, res) => {
    try {
        const { internalCode } = req.body
        const client = await Client.findOne({ where: { internalCode } });

        if (client) {
            const token = jwt.sign(
                { clientId: client.id, internalCode: client.internalCode },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );
            return res.json({ token });
        } else {
            return res.json({ message: "Invalid internalCode" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    createToken,
}