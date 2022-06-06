
const {Router} = require('express');
const { loginController } = require('../controllers/auth.controller');
const { validateJWT } = require('../middlewares');

const router = Router();

router.post('/', loginController, validateJWT );

module.exports = router;
