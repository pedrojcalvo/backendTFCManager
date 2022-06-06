
const bcryptjs = require('bcryptjs');
const { dbQuery, dbQueryCount, dbQueryFindOne } = require('../database/config.db');

const projectGet = async(req, res) => {
    try{
        const {limit=100, from=0} = req.query;
        const sql = 'SELECT * FROM projects INNER JOIN customers ON projects.project_customer = customers.customer_id INNER JOIN users ON projects.project_author = users.user_id WHERE projects.project_state=true ORDER BY project_id LIMIT ? OFFSET ?';
        
        const countSql = 'SELECT COUNT (project_id) as count from projects WHERE project_state=true';

        const [ total, users ] = await Promise.all([
            dbQueryCount(countSql),
            dbQuery(sql,[limit, from])
        ]);

        res.json({
        total,
        users
        });
    }catch(error){
        return  res.send({error:'No hay proyectos en la base de datos'});
    }
}

const inactiveProjectGet = async(req, res) => {
    try{
        const {limit=100, from=0} = req.query;
        const sql = 'SELECT * FROM projects INNER JOIN customers ON projects.project_customer = customers.customer_id INNER JOIN users ON projects.project_author = users.user_id WHERE projects.project_state=false ORDER BY project_id LIMIT ? OFFSET ?';
        
        const countSql = 'SELECT COUNT (project_id) as count from projects WHERE project_state=false';

        const [ total, users ] = await Promise.all([
            dbQueryCount(countSql),
            dbQuery(sql,[limit, from])
        ]);

        res.json({
        total,
        users
        });
    }catch(error){
        return  res.send({error:'No hay proyectos en la base de datos'});
    }
}

// SELECT distinct u.user_name FROM workorders wo INNER JOIN projects p ON p.project_id=wo.workorder_project INNER JOIN users u ON u.user_id=wo.workorder_author WHERE p.project_id=1;

const projectGetById = async(req, res) => {
    try{
        const {id} = req.params;
        const sql = 'SELECT * from projects INNER JOIN customers ON projects.project_customer = customers.customer_id INNER JOIN users ON projects.project_author = users.user_id WHERE project_state=true AND project_id=?';
        const [ project ] = await Promise.all([
            dbQueryFindOne(sql,[id])
        ]);

        res.json({
            project
        });
    }catch(error){
        return  res.send({error:'No se encuentra el Proyecto'});
    }
}

const inactiveProjectGetById = async(req, res) => {
    try{
        const {id} = req.params;
        const sql = 'SELECT * from projects INNER JOIN customers ON projects.project_customer = customers.customer_id INNER JOIN users ON projects.project_author = users.user_id WHERE project_state=false AND project_id=?';
        const [ project ] = await Promise.all([
            dbQueryFindOne(sql,[id])
        ]);

        res.json({
            project
        });
    }catch(error){
        return  res.send({error:'No se encuentra el Proyecto'});
    }
}

const projectPost = async(req, res) => {
    try{
        const { project_name, project_author, project_customer, project_description, project_alert  } = req.body;

        const sql = 'INSERT INTO projects (project_name, project_author, project_customer, project_description, project_alert) VALUES (?, ?, ?, ?, ?)';
        dbQuery(sql, [project_name, project_author, project_customer, project_description, project_alert]);

        res.json({
            mssg: 'post API'
        });
    }catch(error){
        return  res.send({error:'No se ha podido crear el proyecto'});
    }
}

const projectPut = async(req, res) => {
    try{
        const { id } = req.params;
        const { project_name, project_customer, project_description, project_alert } = req.body;

        const sql = 'UPDATE projects SET project_name = ?, project_customer = ?, project_description = ?, project_alert = ? WHERE project_id = ?';
        const response = await dbQuery(sql,[project_name, project_customer, project_description, project_alert, id]);

        res.json({
            response
        });
    }catch(error){
        return  res.send({error:'No se ha podido actualizar el poryecto'});
    }
}

const projectPatch = (req, res) => {
    res.json({
        mssg: 'patch API'
    })
}

const projectDelete = async(req, res) => {
    try{
        const { id } = req.params;
        const beginT = await dbQuery('start transaction');
        try{
            
            const sql = 'UPDATE projects SET project_state=false WHERE project_id=?';
            dbQuery(sql,[id]);

            const sqlWorkorder = 'UPDATE workorders SET workorder_state=false WHERE workorder_project=? ';
            const responseWorkorder = await dbQuery(sqlWorkorder,[id]);
            const commit = await dbQuery('commit');
        }catch(error){
            const rollback = await dbQuery('rollback'); 
            throw(error);
        };

        res.json({
            mssg: 'Delete Project'
        });
    }catch(error){
        return  res.send({error:'No se ha podido borrar el proyecto'});
    }
}

const retrieveProjectById = async(req, res) => {
    try{
        const { id } = req.params;
        
        const sql = 'UPDATE projects SET project_state=true WHERE project_id=?';
        dbQuery(sql,[id]);

        res.json({
            mssg: 'Retrieve Project'
        });
    }catch(error){
        return  res.send({error:'No se ha podido recuperar el proyecto'});
    }
}

module.exports = {
    projectGet, projectPut,
    projectPost, projectDelete,
    projectPatch, projectGetById,
    inactiveProjectGet, retrieveProjectById,
    inactiveProjectGetById
}
