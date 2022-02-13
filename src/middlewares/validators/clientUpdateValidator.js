const { check, validationResult } = require('express-validator');

exports.validateClientUpdate = [
    check('taxId')
        .optional()
        .isInt()
        .withMessage('taxId must be number')
        .bail(),
    check('currency')
        .optional()
        .isIn(['USD', 'EUR', 'CLP'])
        .withMessage('Invalid currency, please use USD, EUR or CLP')
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