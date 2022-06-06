
const jwt = require('jsonwebtoken');

const generateJWT= (user) =>{

    return new Promise( (resolve, reject) =>{

        const payload = { id:user.user_id, name:user.user_name, role:user.user_role };

        jwt.sign(payload, process.env.SECRETKEY, {expiresIn: '1d'}, (err, token) =>{

            if(err){
                console.log(err);
                reject('No se pudo generar el toekn');
            }else{
                resolve(token);
            }
        } );

    });

}

module.exports = {
    generateJWT
}
