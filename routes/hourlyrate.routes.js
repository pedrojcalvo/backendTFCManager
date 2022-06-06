
const {Router} = require('express');
const {check} = require('express-validator');

//middlewares
const { validateFields, validateJWT } = require('../middlewares');

const { hourlyrateGet, deleteHourlyrate, hourlyratePatch, hourlyratePut, hourlyratePost, hourlyrateGetById } = require('../controllers/hourlyrate.controllers');
const { validRole, validUserEmail } = require('../helpers/dbValidators');
const { authorizationToken } = require('../middlewares/authorizationToken');
const { isAdminRole } = require('../middlewares/validateRoles');


const router = Router();

router.get('/', authorizationToken, hourlyrateGet );

router.post('/', authorizationToken, isAdminRole, hourlyratePost );

router.post('/:id', authorizationToken, hourlyrateGetById);

router.put('/:id', authorizationToken, isAdminRole, hourlyratePut);

router.patch('/', authorizationToken, isAdminRole, hourlyratePatch);

router.delete('/:id', authorizationToken, isAdminRole, deleteHourlyrate);

module.exports = router;
