
const {Router} = require('express');
const {check} = require('express-validator');

//middlewares
const { validateFields, validateJWT } = require('../middlewares');

const { workorderGet, workorderPut, workorderGetById, inactiveWorkorderGetById, workorderPost, inactiveWorkorderGet, retrieveWorkorderById, workorderDelete, workorderPatch, workorderGetByProjectId, WorkorderMinutesByProjectId, WorkorderMinutesByUserIdAndProjectId, WorkorderMinutesPvpByProjectId, workorderGetByUserId, workorderGetByCustomerId } = require('../controllers/workorder.controllers');
const { validRole, validUserEmail } = require('../helpers/dbValidators');
const { authorizationToken } = require('../middlewares/authorizationToken');
const { isAdminRole } = require('../middlewares/validateRoles');


const router = Router();

router.get('/', authorizationToken, workorderGet);

router.get('/inactives', authorizationToken, inactiveWorkorderGet);

router.post('/', authorizationToken, workorderPost);

router.post('/:id', authorizationToken, workorderGetById);

router.post('/:id/inactives', authorizationToken, inactiveWorkorderGetById);

router.post('/:id/projects', authorizationToken, workorderGetByProjectId);

router.post('/:id/user', authorizationToken, workorderGetByUserId);

router.post('/:id/customer', authorizationToken, workorderGetByCustomerId);

router.post('/:id/projects/minutes', authorizationToken, WorkorderMinutesByProjectId);

router.post('/:id/projects/minutes/pvp', authorizationToken, WorkorderMinutesPvpByProjectId);

router.post('/:id/projects/minutes/users', authorizationToken, WorkorderMinutesByUserIdAndProjectId);

router.put('/:id', authorizationToken, isAdminRole, workorderPut);

router.put('/:id/retrieve', authorizationToken, isAdminRole, retrieveWorkorderById);

router.patch('/', authorizationToken, isAdminRole, workorderPatch);

router.delete('/:id', authorizationToken, isAdminRole, workorderDelete);

module.exports = router;
