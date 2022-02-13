const bodyParser = require('body-parser');
const NodeCache = require("node-cache");
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./utils/swagger.json')
require("dotenv").config({ path: ".env" });

const app = express();
const port = process.env.PORT || 3000;
const cache = new NodeCache({ stdTTL: process.env.CACHETIME });

require('./cron')

const swaggerFileserver = {
    ...swaggerFile,
    host: process.env.HOST
}

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerFileserver))
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(require('./routes'))

global.cache = global.cache || cache

app.listen(port, '0.0.0.0', () => {
    console.log(`server listening on http://localhost:${port}`);
    console.log(`Documentation in http://localhost:${port}/documentation`);
})