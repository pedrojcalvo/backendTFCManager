
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = async(req = request, res = response, next) =>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            mssg: 'No se encuentra el x-token'
        })
    }

    try{
        const { user_id } = jwt.verify(token, process.env.SECRETKEY);
        const sql = 'SELECT * FROM users WHERE user_state=true AND user_id=? ';
        const userToken = await dbQuery(sql, [user_id]);

        if(!userToken){
            return res.status(401).json({
                mssg: 'Token no válido. - usuario no está en la BD'
            })
        }
        
        req.user = userToken;
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({
            mssg: 'x-token no válido.'
        })
    } 
}

module.exports = {
    validateJWT
}
