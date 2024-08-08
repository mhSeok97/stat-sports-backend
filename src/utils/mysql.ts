import "reflect-metadata"
import { DataSource } from "typeorm"
import { MySQLConfig } from "config/mysql.config"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: MySQLConfig.host,
  port: MySQLConfig.port,
  username: MySQLConfig.user,
  password: MySQLConfig.password,
  database: MySQLConfig.database,
  entities: [],
  synchronize: MySQLConfig.synchronize,
  logging: false,
  // KST
  timezone: "Asia/Seoul",
})
