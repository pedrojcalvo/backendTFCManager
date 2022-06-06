
const impValidateFields = require('../middlewares/validateFields');
const impValidateJWT = require('../middlewares/validateJWT');
const impValidateRoles = require('../middlewares/validateRoles');

module.exports = {
    ...impValidateFields,
    ...impValidateJWT,
    ...impValidateRoles
}
