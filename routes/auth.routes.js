
const {Router} = require('express');
const {check} = require('express-validator');
const { loginController } = require('../controllers/auth.controller');
const { customerGet } = require('../controllers/customer.controllers');
const { validateJWT } = require('../middlewares');

const {validateFields} = require('../middlewares/validateFields');

const router = Router();

router.post('/',
    loginController,
    validateJWT
);

router.get('/', customerGet)

module.exports = router;
