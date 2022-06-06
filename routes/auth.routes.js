
const {Router} = require('express');
const {check} = require('express-validator');
const { loginController } = require('../controllers/auth.controller');
const { validateJWT } = require('../middlewares');

const {validateFields} = require('../middlewares/validateFields');

const router = Router();

router.post('/',
    loginController,
    validateJWT
);

module.exports = router;
