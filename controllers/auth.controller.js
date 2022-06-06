
const bcryptjs = require('bcryptjs');
const { dbQuery } = require('../database/config.db');
const { generateJWT } = require('../helpers/generateJWT');


const loginController = async(req, res ) => {

    const { user_email, user_password } = req.body;
    
    const sql = 'SELECT * FROM users WHERE user_state=true AND user_email=? ';

    const userLogged = await dbQuery(sql, [user_email]);

    const passwordCorrect = userLogged[0] == null ? false : await bcryptjs.compare(user_password, userLogged[0].user_password);

    if(!userLogged[0] || !passwordCorrect){
        res.status(401).json({
            
            error: 'Usuario o contraseña inválido.'+ user_email + ',' + user_password 
        })
    }else{
        const token = await generateJWT(userLogged[0]);
        
        res.json({
            id: userLogged[0].user_id,
            name: userLogged[0].user_name,
            role: userLogged[0].user_role,
            token: token
        });
    }
}

module.exports = {
    loginController
}
