const { response, request } = require("express");
const jwt = require('jsonwebtoken');

const isAdminRole = (req = request, res = response, next) => {

    const authorization = req.get('Authorization');
    let token='';
    // console.log(authorization);

    if(!authorization){
        return res.status(500).json({
            mssg: 'Intento de validar el rol sin validar el token'
        });
    };

    if(authorization && authorization.toLocaleLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }

    console.log(token);

    let decodedToken = {}
    try{
        decodedToken = jwt.verify(token, process.env.SECRETKEY);
        if(decodedToken.role !== 1){
            return res.status(401).json({
                mssg: `${decodedToken.name} no es administrador del sistema.`
            });
        };
    }catch{}

  





    next();
};

module.exports = {
    isAdminRole
}
