
const {Router} = require('express');

//middlewares
const { workorder_materialsInsert } = require('../controllers/workorder_materials.controllers');
const { authorizationToken } = require('../middlewares/authorizationToken');

const router = Router();

router.post('/', authorizationToken, workorder_materialsInsert);

module.exports = router;
