const { check, validationResult } = require('express-validator');

exports.validateAuth = [
    check('internalCode')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('internalCode cant be empty')
        .bail()
        .isString()
        .withMessage('internalCode must be string')
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