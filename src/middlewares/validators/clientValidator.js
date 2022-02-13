const { check, validationResult } = require('express-validator');

exports.validateClient = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('name cant be empty')
        .bail()
        .isString()
        .withMessage('name must be string')
        .bail(),
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
    check('taxId')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('taxId cant be empty')
        .bail()
        .isInt()
        .withMessage('taxId must be number')
        .bail(),
    check('currency')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Currency cant be empty')
        .bail()
        .isIn(['USD', 'EUR', 'CLP'])
        .withMessage('Invalid currency, please use USD, EUR or CLP')
        .bail(),
    check('quota')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('quota cant be empty')
        .bail()
        .isInt({ min: 1 })
        .withMessage('quota must be number and greater than 0')
        .bail(),
    check('bankRegisters')
        .notEmpty()
        .withMessage('bankRegisters cant be empty')
        .isArray()
        .withMessage('bankRegisters must be array')
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