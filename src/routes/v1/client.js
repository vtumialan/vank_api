const router = require('express').Router()
const Client = require('../../controllers/client');
const { validateClient } = require('../../middlewares/validators/clientValidator');
const { validateClientUpdate } = require('../../middlewares/validators/clientUpdateValidator');
const { verifyJwt } = require('../../middlewares/jwt');

router.post('/', validateClient, Client.createClient)
router.patch('/profile', verifyJwt, validateClientUpdate, Client.updateClient)

module.exports = router;