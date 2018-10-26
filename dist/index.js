"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./router/router"));
const path = require("path");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const server = server_1.default.init(3000);
//Importing routes
//
server.app.set('view engine', 'ejs');
server.app.set('views', path.join(__dirname, 'views'));
//middlewares (funciones entre que se recibe una petición y se responde)
server.app.use(morgan('dev'));
server.app.use(myConnection(mysql, {
    host: '192.168.0.2',
    user: 'root',
    password: 'alien',
    port: 3308,
    database: 'nodejsmysqlana',
}, 'single'));
//Routes
server.app.use('/', router_1.default);
// Starting server
server.start(() => {
    console.log("Ana la mejor (?");
});
