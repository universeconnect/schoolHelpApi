// 引入mysql和co-mysql，用于连接数据库
const mysql = require('mysql');
/*const coMysql = require('co-mysql');*/

// 引入数据库配置
const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASS,
    DB_NAME
} = require('../config');

// 1. 创建服务器连接池
/*const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
});*/
// 1. 创建服务器连接
/*const connection = mysql.createConnection({
    host     : DB_HOST,
    user     : DB_USER,
    password : DB_PASS,
    database : DB_NAME
});*/

/*// 2. 使用co-mysql包装连接池，将连接转换为Async/Await异步方式
const connection = coMysql(pool);*/
//connection = pool;
//connection.connect();

// 3. 作为模块导出使用
var pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port:DB_PORT,
    connectionLimit : 1000,//允许同一时刻有1000个连接。
});

module.exports = pool;
