import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { Server } from 'http'
import { join } from 'path'
import { CORS_CREDENTIALS, CORS_ORIGIN, LOG_FORMAT, NODE_ENV, PORT } from 'config'
import { logger, stream } from 'utils/logger'
import { getMetadataArgsStorage, useContainer, useExpressServer } from 'routing-controllers'
import { Container } from 'typeorm-typedi-extensions'
import { AppDataSource } from 'utils/mysql'
import { ErrorMiddleware } from 'middlewares/error.middlewares'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { routingControllersToSpec } from 'routing-controllers-openapi'

export class App {
  public app: express.Application
  public server: Server
  public env: string
  public port: string | number

  constructor() {
    try {
      this.app = express()
      this.env = NODE_ENV || 'development'
      this.port = PORT || 3000
    } catch (e) {
      logger.error('main error:', e)
    }
  }

  public async listen() {
    logger.info('use container')
    useContainer(Container)
    logger.info('use express server')

    try {
      await AppDataSource.initialize()
      logger.info('connected database successfully')
      this.initializeMiddleware()

      useExpressServer(this.app, {
        routePrefix: '/api/v1',
        controllers: [join(__dirname, 'api', '**', '*.controller.ts')],
        middlewares: [ErrorMiddleware],
        defaultErrorHandler: false,
      })

      if (this.env !== 'live') {
        logger.info('init swagger')
        this.initializeSwagger()
      }

      // 서버 시작
      this.server = this.app.listen(this.port, () => {
        logger.info(`=========== ENV:${this.env} ===========`)
        logger.info(`🚀 App listening on the port ${this.port}`)
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  private initializeMiddleware() {
    const origin: string = CORS_ORIGIN

    this.app.use(morgan(LOG_FORMAT, { stream }))
    this.app.use(
      cors({
        origin: origin.split(','),
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: CORS_CREDENTIALS,
      }),
    )

    this.app.use(hpp())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
  }

  public getServer() {
    return this.app
  }

  private initializeSwagger() {
    const storage = getMetadataArgsStorage()
    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: 'api/v1',
    })
    const spec = routingControllersToSpec(
      storage,
      {},
      {
        components: {
          schemas,
          securitySchemes: {
            AuthPayload: {
              type: 'apiKey',
              in: 'header',
              name: 'X-AUTH-PAYLOAD',
              description: '사용자 정보를 가져오기 위한 페이로드',
            },
          },
        },
        info: {
          title: 'Statkick API',
          version: '1.0.0',
        },
        servers: [
          {
            url: '/api/v1',
          },
        ],
      },
    )
    console.log(spec)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec))
  }
}
