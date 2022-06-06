
const { dbQueryExists } = require('../database/config.db');

const validRole = async(role_name = '') => {

    const sql ='SELECT role_name from roles WHERE role_id = ?';
    const roleExists = await dbQueryExists(sql, [role_name]);

    if(!roleExists){
        throw new Error(`El rol ${role_name} no está registrado en la base de datos.`);
    }
};

const validCustomerEmail = async(customer_email='') => {
    const sql ='SELECT customer_email from customers WHERE customer_email = ?';
    const emailExists = await dbQueryExists(sql, [customer_email]);
    if(emailExists){
        throw new Error(`El correo ${customer_email} ya fue registrado.`);
    };

};

const validUserEmail = async(user_email = '') => {

    const sql ='SELECT user_email from users WHERE user_email = ?';
    const emailExists = await dbQueryExists(sql, [user_email]);
    if(emailExists){
        throw new Error(`El correo ${user_email} ya fue registrado.`);
    };
};

const validUserId = async(user_id) => {
    const sql ='SELECT id from users WHERE id = ?';
    const userIdExists = await dbQueryExists(sql, [user_id]);
    if(!userIdExists){
        throw new Error(`No existe ningún usuario con el ID: ${user_id}.`);
    };
};

const validPhone = async(customer_phone) => {
    if(!(/^[0-9]{9}$/.test(customer_phone))){
        throw new Error(`El formato del teléfono ${customer_phone} es erróneo`)
    }
}

module.exports = {
    validRole, validUserEmail, validUserId, validCustomerEmail, validPhone
}
