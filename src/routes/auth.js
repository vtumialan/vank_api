const router = require('express').Router()
const Auth = require('../controllers/authentication');
const { validateAuth } = require('../middlewares/validators/authValidator');

router.post('/', validateAuth, Auth.createToken)

module.exports = router;