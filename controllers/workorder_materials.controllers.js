
const { dbQuery, dbQueryCount, dbQueryFindOne } = require('../database/config.db');

const workorder_materialsInsert = async(req, res) => {
    try{
        const { materials } = req.params;
        
        // const beginT = await dbQuery('start transaction'); //comienza la transacción, hasta que no se ejecuta el commit no se lanzan los cambios a la BD
        // try{
        //     const sql = 'INSERT INTO customers (customer_dni, customer_name, customer_email, customer_address, customer_city, customer_province, customer_cp, customer_phone, customer_alert) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        //     dbQuery(sql, [customer_dni, customer_name, customer_email, customer_address, customer_city, customer_province, customer_cp, customer_phone, customer_alert]);
        //     const commit = await dbQuery('commit');//gurada los cambios en la base de datos

        // }catch(error){
        //     const rollback = await dbQuery('rollback'); //deshace los cambios si ha saltado un error en alguna de las querys
        //     throw(error);
        // };

        // res.json({
        //     response
        // });
    }catch(error){
        return  res.send({error:'No se han podido registar los materiales en el proyecto'});
    }
}

module.exports = {
    workorder_materialsInsert
}
