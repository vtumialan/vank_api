const { check, validationResult } = require('express-validator');

exports.validateInvoice = [
    check('vendorId')
        .optional()
        .isInt()
        .withMessage('vendorId must be number')
        .bail(),
    check('startDate')
        .optional()
        .isDate()
        .withMessage('startDate must be date with this format YYYY-MM-DD')
        .bail(),
    check('endDate')
        .optional()
        .isDate()
        .withMessage('endDate must be date with this format YYYY-MM-DD')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let messages = []
            errors.array().forEach((error) => {
                messages.push(error['msg'])
            });
            return res.status(422).json({ message: messages.join(' | ') });
        }
        next();
    },
];