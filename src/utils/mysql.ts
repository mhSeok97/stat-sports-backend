import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { MySQLConfig } from 'config/mysql.config'
import { LeagueEntity } from 'api/football/league/entity/League.entity'
import { TeamEntity } from 'api/football/team/entity/Team.entity'
import { PostEntity } from 'api/community/post/entity/Post.entity'
import { CommentEntity } from 'api/community/post/comment/entity/Comment.entity'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: MySQLConfig.host,
  port: MySQLConfig.port,
  username: MySQLConfig.user,
  password: MySQLConfig.password,
  database: MySQLConfig.database,
  entities: [LeagueEntity, TeamEntity, PostEntity, CommentEntity],
  synchronize: MySQLConfig.synchronize,
  logging: false,
  // KST
  timezone: 'Z',
})
