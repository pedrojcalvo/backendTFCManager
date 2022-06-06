
const { dbQuery, dbQueryCount, dbQueryFindOne } = require('../database/config.db');

const materialGet = async(req, res) => {
    try{
        const {limit=100, from=0} = req.query;
        const sql = 'SELECT * from materials WHERE material_state=true LIMIT ? OFFSET ?';
        const countSql = 'SELECT COUNT (material_id) as count from materials WHERE material_state=true';

        const [ total, materials ] = await Promise.all([
            dbQueryCount(countSql),
            dbQuery(sql,[limit, from])
        ]);

        res.json({
        total,
        materials
        });
    }catch(error){
        return res.send({error:'No hay materiales en la base de datos'});
    }
}

const inactiveMaterialGet = async(req, res) => {
    try{
        const {limit=100, from=0} = req.query;
        const sql = 'SELECT * from materials WHERE material_state=false LIMIT ? OFFSET ?';
        const countSql = 'SELECT COUNT (material_id) as count from materials WHERE material_state=false';

        const [ total, materials ] = await Promise.all([
            dbQueryCount(countSql),
            dbQuery(sql,[limit, from])
        ]);

        res.json({
        total,
        materials
        });
    }catch(error){
        return res.send({error:'No hay materiales en la base de datos'});
    }
}

const materialByIdGet = async(req, res) => {
    try{
        const {id} = req.params;
        const sql = 'SELECT * from materials WHERE material_state=true AND material_id=?';
        const [ material ] = await Promise.all([
            dbQueryFindOne(sql, [id])
        ]);

        res.json({
        material
        });
    }catch(error){
        return  res.send({error:'No se encuentra el material'});
    }
}

const inactiveMaterialByIdGet = async(req, res) => {
    try{
        const {id} = req.params;
        const sql = 'SELECT * from materials WHERE material_state=false AND material_id=?';
        const [ material ] = await Promise.all([
            dbQueryFindOne(sql, [id])
        ]);

        res.json({
        material
        });
    }catch(error){
        return  res.send({error:'No se encuentra el material'});
    }
}

const getMaterialsByWorkorderId = async(req, res) => {
    try{
        const {id} = req.params;
        const sql = 'SELECT *, (materials.material_pvp*workorder_materials.material_amount) AS total_cost FROM workorder_materials INNER JOIN materials ON workorder_materials.material_id = materials.material_id WHERE workorder_id = ?';
        const [ materialByWorkorder ] = await Promise.all([
            dbQuery(sql,[id])
        ]);

        res.json({
            materialByWorkorder
        });
    }catch(error){
        return  res.send({error:'No exite el parte de trabajo en la base de datos'});
    }
}

const materialsPvpAdditionByprojectId =async(req, res) =>{
    try{
        const {id} = req.params;

        const sql = 'SELECT wo.workorder_project, m.material_id, m.material_reference, m.material_brand, m.material_description, m.material_pvp, m.material_ecotax, sum(wom.material_amount) AS material_amount, sum(m.material_pvp*wom.material_amount) AS total_cost FROM workorders wo INNER JOIN workorder_materials wom on wom.workorder_id=wo.workorder_id INNER JOIN materials m on m.material_id=wom.material_id WHERE wo.workorder_project=? GROUP BY wo.workorder_project, m.material_id, m.material_reference, m.material_brand, m.material_description, m.material_pvp, m.material_ecotax';
        const [ materialsByProject ] = await Promise.all([
            dbQuery(sql,[id])
        ]);

        res.json({
        materialsByProject
        });
    }catch(error){
        return res.send({error:'No hay materiales asignados al proyecto'});
    }
}

const materialsTotalPvpByprojectId =async(req, res) =>{
    try{
        const {id} = req.params;

        const sql = 'select wo.workorder_project,sum(m.material_pvp*wom.material_amount) as total_cost from workorders wo inner join workorder_materials wom on wom.workorder_id=wo.workorder_id inner join materials m on m.material_id=wom.material_id where workorder_project=? group by wo.workorder_project;';
        const [ materialsTotalPvpByProject ] = await Promise.all([
            dbQueryFindOne(sql,[id])
        ]);

        res.json({
            materialsTotalPvpByProject
        });
    }catch(error){
        return  res.send({error:'No hay materiales asignados al proyecto'});
    }
}

const materialPost = async(req, res) => {
    try{
        const { material_reference, material_brand, material_description, material_pvp, material_ecotax } = req.body;

        const sql = 'INSERT INTO materials ( material_reference, material_brand, material_description, material_pvp, material_ecotax) VALUES (?, ?, ?, ?, ?)';
        dbQuery(sql, [ material_reference, material_brand, material_description, material_pvp, material_ecotax]);

        res.json({
            mssg: 'post API'
        });
    }catch(error){
        return  res.send({error:'El material no ha podido ser guardado'});
    }
}

const materialPut = async(req, res) => {
    try{
        const { id } = req.params;
        const {material_reference, material_brand, material_description, material_pvp, material_ecotax } = req.body;

        const sql = 'UPDATE materials SET material_reference = ?, material_brand = ?, material_description = ?, material_pvp = ?, material_ecotax = ? WHERE material_id=?';
        const response = await dbQuery(sql,[material_reference, material_brand, material_description, material_pvp, material_ecotax, id]);

        res.json({
            response
        });
    }catch(error){
        return  res.send({error:'El material no ha podido ser actualizado'});
    }
}

const materialPatch = async(req, res) => {
    res.json({
        mssg: 'patch API'
    })
}

const materialDelete = async(req, res) => {
    try{
        const { id } = req.params;
        
        const sql = 'UPDATE materials SET material_state=false WHERE material_id=?';
        dbQuery(sql,[id]);

        res.json({
            mssg: 'Delete material'
        });
    }catch(error){
        return  res.send({error:'El material no ha podido ser borrado'});
    }   
}

const retrieveMaterialById = async(req, res) => {
    try{
        const { id } = req.params;
        
        const sql = 'UPDATE materials SET material_state=true WHERE material_id=?';
        dbQuery(sql,[id]);

        res.json({
            mssg: 'Retrieve material'
        });
    }catch(error){
        return  res.send({error:'El material no ha podido ser recuperado'});
    }   
}

module.exports = {
    materialGet, materialPut,
    materialPost, materialDelete,
    materialPatch, materialByIdGet,
    materialsPvpAdditionByprojectId,
    materialsTotalPvpByprojectId,
    getMaterialsByWorkorderId, 
    retrieveMaterialById, inactiveMaterialGet,
    inactiveMaterialByIdGet
}
