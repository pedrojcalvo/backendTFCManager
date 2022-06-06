
const { dbQuery, dbQueryCount, dbQueryFindOne } = require('../database/config.db');

const hourlyrateGet = async(req, res) => {
    try{
        const sql = 'SELECT * FROM hourlyrates WHERE hourlyrate_state=true';
        
        const countSql = 'SELECT COUNT (workorder_id) as count from workorders WHERE workorder_state=true';

        const [ total, hourlyrates ] = await Promise.all([
            dbQueryCount(countSql),
            dbQuery(sql)
        ]);

        res.json({
        total,
        hourlyrates
        });
    }catch(error){
        return  res.send({error:'No se encuentran tarifas en la base de datos'});
    }
}

const hourlyrateGetById = async(req, res) => {
    try{
        const {id} = req.params;
        const sql = 'SELECT * from hourlyrates WHERE hourlyrate_state=true AND hourlyrate_id=?';
        const [ hourlyrate ] = await Promise.all([
            dbQueryFindOne(sql,[id])
        ]);

        res.json({
            workorder
        });
    }catch(error){
        return  res.send({error:'No se encuentra la tarifa'});
    }
}

const hourlyratePost = async(req, res) => {
    try{
        const { hourlyrate_name, hourlyrate_pvp} = req.body;

        const sql = 'INSERT INTO hourlyrates (hourlyrate_name, hourlyrate_pvp) VALUES (?, ?)';
        dbQuery(sql, [hourlyrate_name, hourlyrate_pvp]);

        res.json({
            mssg: 'post API'
        });
    }catch(error){
        return  res.send({error:'No se ha podido crear la tarifa'});
    }
}

const hourlyratePut = async(req, res) => {
    try{
        const { id } = req.params;
        const { hourlyrate_name, hourlyrate_pvp } = req.body;

        const sql = 'UPDATE workorders SET  hourlyrate_name = ?, hourlyrate_pvp = ? WHERE hourlyrate_id = ?';
        const response = await dbQuery(sql,[hourlyrate_name, hourlyrate_pvp, id]);

        res.json({
            response
        });
    }catch(error){
        return  res.send({error:'No se ha podido actualizar la tarifa'});
    }
}

const hourlyratePatch = (req, res) => {
    res.json({
        mssg: 'patch API'
    })
}

const deleteHourlyrate = async(req, res) => {
    try{
        const { id } = req.params;

        const sql = 'UPDATE hourlyrates SET hourlyrate_state=false WHERE hourlyrate_id=?';
        dbQuery(sql,[id]);

        res.json({
            mssg: 'Delete hourlyrate'
        });
    }catch(error){
        return  res.send({error:'No se podido borrar la tarifa'});
    }
}

module.exports = {
    hourlyrateGet, deleteHourlyrate,
    hourlyratePatch, hourlyratePut,
    hourlyratePost, hourlyrateGetById
}
