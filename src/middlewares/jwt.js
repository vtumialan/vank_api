const jwt = require("jsonwebtoken");
const { Client } = require('../models');

const verifyJwt = async (request, res, next) => {
    try {
        if (!request.headers.authorization) {
            return res.status(401).send({ error: "No token was sent" });
        }
        const token = request.headers.authorization.replace("Bearer ", "");
        let jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

        const { clientId } = jwtPayload;
        const client = await Client.findOne({ where: { id: clientId } });
        if (!client) {
            return res.status(401).send({ error: "Authentication failed" });
        }

        request.client = client;
        next();
    } catch (error) {
        return res.status(401).send({ error });
    }
};

module.exports = {
    verifyJwt,
};