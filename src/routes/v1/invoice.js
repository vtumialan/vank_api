const router = require('express').Router();
const Invoice = require('../../controllers/invoice');
const { validateInvoice } = require('../../middlewares/validators/invoiceValidator');
const { verifyJwt } = require('../../middlewares/jwt');

router.get('/', verifyJwt, validateInvoice, Invoice.getAllInvoices)

module.exports = router;