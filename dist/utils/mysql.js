"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const mysql_config_1 = require("config/mysql.config");
const inquiry_entity_1 = require("api/inquiry/entity/inquiry.entity");
const comment_entity_1 = require("api/inquiry/comment/entity/comment.entity");
const answer_entity_1 = require("api/inquiry/answer/entity/answer.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: mysql_config_1.MySQLConfig.host,
    port: mysql_config_1.MySQLConfig.port,
    username: mysql_config_1.MySQLConfig.user,
    password: mysql_config_1.MySQLConfig.password,
    database: mysql_config_1.MySQLConfig.database,
    entities: [inquiry_entity_1.Inquiry, comment_entity_1.Comment, answer_entity_1.Answer],
    synchronize: mysql_config_1.MySQLConfig.synchronize,
    logging: false,
    timezone: "Asia/Seoul"
});
//# sourceMappingURL=mysql.js.map