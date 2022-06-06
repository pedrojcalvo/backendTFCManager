

const {Router} = require('express');
const {check} = require('express-validator');

//middlewares
const { validateFields, validateJWT } = require('../middlewares');

const {customerGet, customerByIdGet, customerPut, customerPost, customerDelete, customerPatch, projectGetByCustomerId, projectInactiveGetByCustomerId, inactiveCustomerByIdGet, inactiveCustomerGet, retrieveCustromerById } = require('../controllers/customer.controllers');
const { validCustomerEmail, validPhone, validRole } = require('../helpers/dbValidators');
const { authorizationToken } = require('../middlewares/authorizationToken');
const { isAdminRole } = require('../middlewares/validateRoles');

const router = Router();

router.get('/', customerGet);

router.get('/inactives', authorizationToken, inactiveCustomerGet);

router.get('/:id', authorizationToken, customerByIdGet);

router.get('/:id/inactive', authorizationToken, inactiveCustomerByIdGet);

router.post('/:id/projects', authorizationToken, projectGetByCustomerId);

router.post('/:id/projects/inactive', authorizationToken, projectInactiveGetByCustomerId);

router.post('/',  
    authorizationToken, isAdminRole,
    [
        check('customer_name', 'El nombre es obligatorio.').not().isEmpty(),
        check('customer_email', 'El email no es válido.').isEmail(),
        check('customer_email').custom(validCustomerEmail),
        check('customer_phone', 'El teléfono no es válido').custom(validPhone),
        validateFields
    ],
    customerPost);

router.post('/:id', authorizationToken, customerByIdGet);

router.put('/:id', authorizationToken, isAdminRole, 
    [
        check('customer_name', 'El nombre es obligatorio.').not().isEmpty(),
        check('customer_email', 'El email no es válido.').isEmail(),
        check('customer_phone', 'El teléfono no es válido').custom(validPhone),
        validateFields
    ],
    customerPut);

router.put('/:id/retrieve', authorizationToken, isAdminRole, retrieveCustromerById)

router.delete('/:id', authorizationToken, isAdminRole, customerDelete);

router.patch('/',  authorizationToken, isAdminRole, customerPatch);

module.exports = router;
