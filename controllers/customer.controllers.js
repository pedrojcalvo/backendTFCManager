
const { dbQuery, dbQueryCount, dbQueryFindOne } = require('../database/config.db');

const customerGet = async(req, res) => {
    try{
        const {limit=100, from=0} = req.query;
        const sql = 'SELECT * from customers WHERE customer_state=true LIMIT ? OFFSET ?';
        const countSql = 'SELECT COUNT (customer_id) as count from customers WHERE customer_state=true';

        const [ total, customers ] = await Promise.all([
            dbQueryCount(countSql),
            dbQuery(sql,[limit, from])
        ]);

        res.json({
        total,
        customers
        });
    }catch(error){
        return  res.send({error:'No se encuentran clientes en la base de datos'});
    }
}

const inactiveCustomerGet = async(req, res) => {
    try{
        const {limit=100, from=0} = req.query;
        const sql = 'SELECT * from customers WHERE customer_state=false LIMIT ? OFFSET ?';
        const countSql = 'SELECT COUNT (customer_id) as count from customers WHERE customer_state=false';

        const [ total, customers ] = await Promise.all([
            dbQueryCount(countSql),
            dbQuery(sql,[limit, from])
        ]);

        res.json({
        total,
        customers
        });
    }catch(error){
        return  res.send({error:'No se encuentran clientes inactivos en la base de datos'});
    }
}

const customerByIdGet = async(req, res) => {
    try{
        const {id} = req.params;
        const sql = 'SELECT * from customers WHERE customer_state=true AND customer_id=?';
        const [ customer ] = await Promise.all([
            dbQueryFindOne(sql, [id])
        ]);

        res.json({
        customer
        });
    }catch(error){
        return  res.send({error:'No se encuentra el Cliente'});
    }
}

const inactiveCustomerByIdGet = async(req, res) => {
    try{
        const {id} = req.params;
        const sql = 'SELECT * from customers WHERE customer_state=false AND customer_id=?';
        const [ customer ] = await Promise.all([
            dbQueryFindOne(sql, [id])
        ]);

        res.json({
        customer
        });
    }catch(error){
        return  res.send({error:'No se encuentra el Cliente'});
    }
}

const projectGetByCustomerId = async(req, res) => {
    try{
        const {id} = req.params;
        const {limit=100, from=0} = req.query;
        const sql = 'SELECT * from projects INNER JOIN customers ON projects.project_customer = customers.customer_id INNER JOIN users ON projects.project_author = users.user_id WHERE project_state=true AND project_customer=? LIMIT ? OFFSET ?';
        const countSql = 'SELECT COUNT (project_id) as count from projects WHERE project_state=true AND project_customer=?';
        const [ total, projects ] = await Promise.all([
            dbQueryCount(countSql,[id]),
            dbQuery(sql,[id, limit, from])
        ]);

        res.json({
            total,
            projects
        });
    }catch(error){
        return  res.send({error:'El cliente no tiene ningún proyecto'});
    }
}
const projectInactiveGetByCustomerId = async(req, res) => {
    try{
        const {id} = req.params;
        const {limit=100, from=0} = req.query;
        const sql = 'SELECT * from projects INNER JOIN customers ON projects.project_customer = customers.customer_id INNER JOIN users ON projects.project_author = users.user_id WHERE project_state=false AND project_customer=? LIMIT ? OFFSET ?';
        const countSql = 'SELECT COUNT (project_id) as count from projects WHERE project_state=false AND project_customer=?';
        const [ total, projects ] = await Promise.all([
            dbQueryCount(countSql,[id]),
            dbQuery(sql,[id, limit, from])
        ]);

        res.json({
            total,
            projects
        });
    }catch(error){
        return  res.send({error:'No hay proyectos inactivos en el cliente'});
    }
}

const customerPost = async(req, res) => {
    try{
        const { customer_dni, customer_name, customer_email, customer_address, customer_city, customer_province, customer_cp, customer_phone, customer_alert } = req.body;

        //guardar en BD
        const sql = 'INSERT INTO customers (customer_dni, customer_name, customer_email, customer_address, customer_city, customer_province, customer_cp, customer_phone, customer_alert) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        dbQuery(sql, [customer_dni, customer_name, customer_email, customer_address, customer_city, customer_province, customer_cp, customer_phone, customer_alert]);

        res.json({
            mssg: 'post API'
        });
    }catch(error){
        return  res.send({error:'No se ha podido crear el cliente'});
    }
}

const customerPut = async(req, res) => {
    try{
        const { id } = req.params;
        const {customer_name, customer_email, customer_address, customer_city, customer_province, customer_cp, customer_phone, customer_alert } = req.body;

        const sql = 'UPDATE customers SET customer_name = ?, customer_email = ?, customer_address = ?, customer_city = ?, customer_province = ?, customer_cp = ?, customer_phone = ?, customer_alert = ? WHERE customer_id=?';
        const response = await dbQuery(sql,[customer_name, customer_email, customer_address, customer_city, customer_province, customer_cp, customer_phone, customer_alert, id]);

        res.json({
            response
        });
    }catch(error){
        return  res.send({error:'No se podido actualizar el cliente'});
    }
}



const customerDelete = async(req, res) => {
    try{
        const { id } = req.params;
        const beginT = await dbQuery('start transaction'); //comienza la transacción, hasta que no se ejecuta el commit no se lanzan los cambios a la BD
        try{
            
            const sql = 'UPDATE customers SET customer_state=false WHERE customer_id=?';
            const response = await dbQuery(sql,[id]);

            const sqlProject = 'UPDATE projects SET project_state=false WHERE project_customer=?';
            const responseProject = await dbQuery(sqlProject,[id]);

            const sqlWorkorder = 'UPDATE workorders SET workorder_state=false WHERE workorder_project IN(SELECT project_id FROM projects WHERE project_customer=?)';
            const responseWorkorder = await dbQuery(sqlWorkorder,[id]);
            const commit = await dbQuery('commit');//gurada los cambios en la base de datos

        }catch(error){
            const rollback = await dbQuery('rollback'); //deshace los cambios si ha saltado un error en alguna de las querys
            throw(error);
        };

        res.json({
            response
        });
    }catch(error){
        return  res.send({error:'No se podido borrar el cliente'});
    }
}

const retrieveCustromerById = async(req, res) => {
    try{
        const { id } = req.params;
        
        const sql = 'UPDATE customers SET customer_state=true WHERE customer_id=?';
        const response = await dbQuery(sql,[id]);

        res.json({
            response
        });
    }catch(error){
        return  res.send({error:'No se podido recuperar el cliente'});
    }
}

const customerPatch = (req, res) => {
    res.json({
        mssg: 'patch API'
    })
}

module.exports = {
    customerGet, customerByIdGet,
    customerPut, customerPost, 
    customerDelete, customerPatch,
    projectGetByCustomerId, projectInactiveGetByCustomerId,
    inactiveCustomerGet, retrieveCustromerById,
    inactiveCustomerByIdGet
}
