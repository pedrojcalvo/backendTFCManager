
const {Router} = require('express');
const { isAdminRole } = require('../middlewares/validateRoles');
//const {check} = require('express-validator');

//middlewares
//const { validateFields, validateJWT } = require('../middlewares');

const { materialGet, materialByIdGet, inactiveMaterialByIdGet, materialPut, materialPost, materialDelete, materialPatch, materialsPvpAdditionByprojectId, materialsTotalPvpByprojectId, getMaterialsByWorkorderId, retrieveMaterialById, inactiveMaterialGet } = require('../controllers/material.controllers');
const { } = require('../helpers/dbValidators');
const { authorizationToken } = require('../middlewares/authorizationToken');

const router = Router();

router.get('/', authorizationToken, materialGet);

router.get('/inactives', authorizationToken, inactiveMaterialGet);

router.post('/:id', authorizationToken, materialByIdGet);

router.post('/:id/inactives', authorizationToken, inactiveMaterialByIdGet);

router.post('/:id/projects', authorizationToken, materialsPvpAdditionByprojectId);

router.post('/:id/workorders', authorizationToken, getMaterialsByWorkorderId);

router.post('/:id/projects/total', authorizationToken, materialsTotalPvpByprojectId);

router.post('/', authorizationToken, isAdminRole, materialPost);

router.put('/:id', authorizationToken, isAdminRole, materialPut);

router.put('/:id/retrieve', authorizationToken, isAdminRole, retrieveMaterialById);

router.patch('/', authorizationToken, isAdminRole, materialPatch);

router.delete('/:id', authorizationToken, isAdminRole, materialDelete);

module.exports = router;
