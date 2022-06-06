
const express = require('express');
const cors = require('cors');

const {dbConnect } = require('../database/config.db');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8081;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.customersPath = '/api/customers';
        this.materialsPath = '/api/materials';
        this.projectsPath = '/api/projects';
        this.workordersPath = '/api/workorders';
        this.hourlyratePath = '/api/hourlyrate';
        this.workorder_materialsPath = '/api/workorder_materials';

        //Conectar a BD
        this.connectDB();

        //Middlewares
        this.middlewares();


        //rutas dde mi app
        this.routes();
    }

    async connectDB(){
        await dbConnect();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y Parseo del body
        this.app.use(express.json());

        //directorio público
        this.app.use(express.static('public')); 
    }

    routes(){
       
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usersPath, require('../routes/user.routes'));
        this.app.use(this.customersPath, require('../routes/customer.routes'));
        this.app.use(this.materialsPath, require('../routes/material.routes'));
        this.app.use(this.projectsPath, require('../routes/project.routes'));
        this.app.use(this.workordersPath, require('../routes/workorder.routes'));
        this.app.use(this.hourlyratePath, require('../routes/hourlyrate.routes'));
        this.app.use(this.workorder_materialsPath, require('../routes/workorder_materials.routes'));
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }

    getApp(){
        return this.app;
    }
}

module.exports = Server;
