"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLConfig = void 0;
exports.MySQLConfig = {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT ? process.env.MYSQL_PORT : "3306"),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    synchronize: false,
};
// # sourceMappingURL=mysql.config.js.map