
const { dbQuery, dbQueryCount, dbQueryFindOne } = require('../database/config.db');

const workorderGet = async(req, res) => {
    try{
        const {limit=100, from=0} = req.query;
        const sql = 'SELECT * FROM workorders LEFT JOIN users ON workorders.workorder_author = users.user_id LEFT JOIN hourlyrates ON workorders.workorder_hourlyrate = hourlyrate_id INNER JOIN projects ON workorders.workorder_project = projects.project_id WHERE workorders.workorder_state=true ORDER BY workorder_id LIMIT ? OFFSET ?';
        
        const countSql = 'SELECT COUNT (workorder_id) as count from workorders WHERE workorder_state=true';

        const [ total, workorders ] = await Promise.all([
            dbQueryCount(countSql),
            dbQuery(sql,[limit, from])
        ]);

        res.json({
        total,
        workorders
        });
    }catch(error){
        return  res.send({error:'No hay Partes de Trabajo en la base de datos TODOS'});
    }
}

const inactiveWorkorderGet = async(req, res) => {
    try{
        const {limit=100, from=0} = req.query;
        const sql = 'SELECT * FROM workorders LEFT JOIN users ON workorders.workorder_author = users.user_id LEFT JOIN hourlyrates ON workorders.workorder_hourlyrate = hourlyrate_id INNER JOIN projects ON workorders.workorder_project = projects.project_id WHERE workorders.workorder_state=false ORDER BY workorder_id LIMIT ? OFFSET ?';
        
        const countSql = 'SELECT COUNT (workorder_id) as count from workorders WHERE workorder_state=false';

        const [ total, workorders ] = await Promise.all([
            dbQueryCount(countSql),
            dbQuery(sql,[limit, from])
        ]);

        res.json({
        total,
        workorders
        });
    }catch(error){
        return  res.send({error:'No hay Partes de Trabajo en la base de datos'});
    }
}

// SELECT u.user_name, COALESCE(AUX.orders,0) FROM users u LEFT JOIN (SELECT workorder_author, COUNT(*) AS orders FROM workorders GROUP BY workorder_author) AUX ON AUX.workorder_author=u.user_id;

const workorderGetById = async(req, res) => {
    try{
        const {id} = req.params;
        const sql = 'SELECT * from workorders INNER JOIN projects ON workorders.workorder_project = projects.project_id INNER JOIN hourlyrates ON workorders.workorder_hourlyrate = hourlyrate_id INNER JOIN users ON workorders.workorder_author = users.user_id WHERE workorder_state=true AND workorder_id=?';
        const [ workorder ] = await Promise.all([
            dbQueryFindOne(sql,[id])
        ]);

        res.json({
            workorder
        });
    }catch(error){
        return  res.send({error:'No se encuentra el Parte de Trabajo'});
    }
}

const inactiveWorkorderGetById = async(req, res) => {
    try{
        const {id} = req.params;
        const sql = 'SELECT * from workorders INNER JOIN projects ON workorders.workorder_project = projects.project_id INNER JOIN hourlyrates ON workorders.workorder_hourlyrate = hourlyrate_id INNER JOIN users ON workorders.workorder_author = users.user_id WHERE workorder_state=false AND workorder_id=?';
        const [ workorder ] = await Promise.all([
            dbQueryFindOne(sql,[id])
        ]);

        res.json({
            workorder
        });
    }catch(error){
        return  res.send({error:'No se encuentra el Parte de Trabajo'});
    }
}

const workorderGetByProjectId = async(req, res) => {
    try{
        const {id} = req.params;
        const {limit=100, from=0} = req.query;
        const sql = 'SELECT * from workorders INNER JOIN projects ON workorders.workorder_project = projects.project_id INNER JOIN hourlyrates ON workorders.workorder_hourlyrate = hourlyrate_id INNER JOIN users ON workorders.workorder_author = users.user_id WHERE workorder_state=true AND projects.project_id=?';
        const countSql = 'SELECT COUNT (workorder_id) as count from workorders WHERE workorder_state=true AND workorder_project = ?';
        
        const [ total, workorders ] = await Promise.all([
            dbQueryCount(countSql, [id]),
            dbQuery(sql,[id, limit, from])
        ]);

        res.json({
        total,
        workorders
        });
    }catch(error){
        return  res.send({error:'No Partes de Trabajo asignados al proyecto'});
    }

}

const workorderGetByUserId = async(req, res) => {
    try{
        const {id} = req.params;
        const {limit=100, from=0} = req.query;
        const sql = 'SELECT * from workorders INNER JOIN projects ON workorders.workorder_project = projects.project_id INNER JOIN hourlyrates ON workorders.workorder_hourlyrate = hourlyrate_id INNER JOIN users ON workorders.workorder_author = users.user_id WHERE workorder_state=true AND users.user_id=?';
        const countSql = 'SELECT COUNT (*) as count from workorders WHERE workorder_state=true AND workorder_id = ?';
        
        const [ total, workorders ] = await Promise.all([
            dbQueryCount(countSql, [id]),
            dbQuery(sql,[id, limit, from])
        ]);

        res.json({
        total,
        workorders
        });
    }catch(error){
        return  res.send({error:'El usuario no tiene Partes de Trabajo creados'});
    }
}

const workorderGetByCustomerId = async(req, res) => {
    try{
        const {id} = req.params;
        const {limit=100, from=0} = req.query;
        const sql = 'SELECT * FROM workorders INNER JOIN projects ON workorders.workorder_project = projects.project_id WHERE workorders.workorder_state=true AND projects.project_customer = ?';
        const countSql = 'SELECT COUNT (*) as count from workorders INNER JOIN projects ON workorders.workorder_project = projects.project_id WHERE workorder_state=true AND projects.project_customer = ?';
        
        const [ total, customerWorkorders ] = await Promise.all([
            dbQueryCount(countSql, [id]),
            dbQuery(sql,[id, limit, from])
        ]);

        res.json({
        total,
        customerWorkorders
        });
    }catch(error){
        return  res.send({error:'El cliente no tiene Partes de Trabajo creados'});
    }
}

const WorkorderMinutesByProjectId = async(req, res) => {
    try{
        const {id} = req.params;
        const sql = 'SELECT workorder_project, sum(workorder_hours)*60+sum(workorder_minutes) AS work_minutes FROM workorders  WHERE workorder_project=? GROUP BY workorder_project';
        const [ workorderMinutes ] = await Promise.all([
            dbQueryFindOne(sql,[id])
        ]);

        res.json({
            workorderMinutes
        });
    }catch(error){
        return res.send({error:'No hay partes de trabajo'});
    }
}

const WorkorderMinutesPvpByProjectId = async(req, res) => {
    try{
        const {id} = req.params;
        const sql = 'SELECT workorder_project, sum((workorder_hours*60+workorder_minutes)*(hourlyrate_pvp/60)) AS amountPerHours FROM workorders INNER JOIN hourlyrates ON workorders.workorder_hourlyrate = hourlyrates.hourlyrate_id WHERE workorder_project=? GROUP BY workorder_project';
        const [ workorderPvpMinutesByUser ] = await Promise.all([
            dbQueryFindOne(sql,[id])
        ]);

        res.json({
            workorderPvpMinutesByUser
        });
    }catch(error){
        return res.send({error:'No hay Partes de Trabajo creados en el proyecto'});
    }
}

const WorkorderMinutesByUserIdAndProjectId = async(req, res) => {
    try{
        const {id} = req.params;
        const sql = 'SELECT wo.workorder_project,u.user_name,sum(wo.workorder_hours)*60+sum(wo.workorder_minutes) AS work_minutes FROM workorders wo inner join users u on u.user_id=wo.workorder_author  WHERE wo.workorder_project=? GROUP BY wo.workorder_project,u.user_name';
        const [ workorderMinutesByUser ] = await Promise.all([
            dbQuery(sql,[id])
        ]);

        res.json({
            workorderMinutesByUser
        });
    }catch(error){
        return res.send({error:'No hay partes de trabajo'});
    }
}

const workorderPost = async(req, res) => {
    try{
        const { workorder_author, workorder_project, workorder_hours, workorder_minutes,  workorder_hourlyrate, workorder_alert, material_list} = req.body;

        const beginT = await dbQuery('start transaction'); 
        try{
            const sql = 'INSERT INTO workorders (workorder_author, workorder_project, workorder_hours, workorder_minutes, workorder_hourlyrate, workorder_alert) VALUES (?, ?, ?, ?, ?, ?)';
            const workorderResponse = await dbQuery(sql, [workorder_author, workorder_project, workorder_hours, workorder_minutes, workorder_hourlyrate, workorder_alert]);
            
            const sqlMaterials = 'INSERT INTO workorder_materials (workorder_id, material_id, material_amount) VALUES (?, ?, ?)';
            
            const materialListPromises = material_list.map(async (element) => {
                await dbQuery(sqlMaterials, [workorderResponse.insertId, element.material_id, element.material_amount]);
            });
            
            await Promise.all(materialListPromises);

            const commit = await dbQuery('commit');
        }catch(error){
            const rollback = await dbQuery('rollback'); 
            throw(error);
        };

        res.json({
            mssg: 'post API'
        });
    }catch(error){
        console.log(error)
        return  res.send({error:'No ha podido crear el Parte de Trabajo'});
    }
}

const workorderPut = async(req, res) => {
    try{
        const { id } = req.params;
        const { workorder_hours, workorder_minutes, workorder_hourlyrate, workorder_alert } = req.body;

        const sql = 'UPDATE workorders SET  workorder_hours = ?, workorder_minutes = ?, workorder_hourlyrate = ?, workorder_alert = ? WHERE workorder_id = ?';
        const response = await dbQuery(sql,[workorder_hours, workorder_minutes, workorder_hourlyrate, workorder_alert, id]);

        res.json({
            response
        });
    }catch(error){
        return  res.send({error:'No se ha podido actualizar el Parte de Trabajo'});
    }
}

const workorderPatch = (req, res) => {
    res.json({
        mssg: 'patch API'
    })
}

const workorderDelete = async(req, res) => {
    try{
        const { id } = req.params;

        const sql = 'UPDATE workorders SET workorder_state=false WHERE workorder_id=?';
        dbQuery(sql,[id]);

        res.json({
            mssg: 'Delete Workorder'
        });
    }catch(error){
        return  res.send({error:'No se ha podido borrar el Parte de Trabajo'});
    }
}

const retrieveWorkorderById = async(req, res) => {
    try{
        const { id } = req.params;

        const sql = 'UPDATE workorders SET workorder_state=true WHERE workorder_id=?';
        dbQuery(sql,[id]);

        res.json({
            mssg: 'Retrieve Workorder'
        });
    }catch(error){
        return  res.send({error:'No se ha podido recuperar el Parte de Trabajo'});
    }
}

module.exports = {
    workorderGet, workorderPut,
    workorderPost, workorderDelete,
    workorderPatch, workorderGetById,
    workorderGetByProjectId, WorkorderMinutesByProjectId,
    WorkorderMinutesByUserIdAndProjectId, 
    WorkorderMinutesPvpByProjectId, workorderGetByUserId, 
    workorderGetByCustomerId, retrieveWorkorderById,
    inactiveWorkorderGet, inactiveWorkorderGetById
}
