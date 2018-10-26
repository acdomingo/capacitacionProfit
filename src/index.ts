import Server from './server/server';
import router from './router/router';
import path = require ('path');
import morgan = require ('morgan');
import mysql = require ('mysql');
import express = require ('express');
import myConnection = require ('express-myconnection');


const server = Server.init (3000);

//Importing routes


//

server.app.set ('view engine', 'ejs');
server.app.set ('views', path.join(__dirname, '../src/views'));

//middlewares (funciones entre que se recibe una petición y se responde)
server.app.use (morgan ('dev'));
server.app.use (myConnection (mysql, {
    host: '192.168.0.2',
    user: 'root',
    password: 'alien',
    port: 3308,
    database: 'nodejsmysqlana',
}, 'single'));

server.app.use (express.urlencoded({extended: false}));



//Routes
server.app.use ('/', router);


// Starting server

server.start( ()=> {
    console.log("Ana la mejor (?");
})