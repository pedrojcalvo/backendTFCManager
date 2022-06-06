
const {Router} = require('express');
const {check} = require('express-validator');

//middlewares
const { validateFields, validateJWT } = require('../middlewares');

const { projectGet, projectPut, projectGetById, projectDelete, inactiveProjectGetById, projectPatch, projectPost, inactiveProjectGet, retrieveProjectById } = require('../controllers/project.controllers');
const { validRole, validUserEmail } = require('../helpers/dbValidators');
const { authorizationToken } = require('../middlewares/authorizationToken');
const { isAdminRole } = require('../middlewares/validateRoles');


const router = Router();

router.get('/', authorizationToken, projectGet);

router.get('/inactives', authorizationToken, inactiveProjectGet);

router.post('/', authorizationToken, isAdminRole, projectPost)

router.post('/:id', authorizationToken, projectGetById);

router.post('/:id/inactive', authorizationToken, isAdminRole, inactiveProjectGetById);

router.put('/:id', authorizationToken, isAdminRole, projectPut);

router.put('/:id/retrieve', authorizationToken, isAdminRole, retrieveProjectById);

router.patch('/', authorizationToken, isAdminRole, projectPatch);

router.delete('/:id', authorizationToken, isAdminRole, projectDelete);

module.exports = router;
