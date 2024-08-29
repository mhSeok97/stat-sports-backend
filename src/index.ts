import { addPath } from 'app-module-path'
import { App } from 'app'
import { ValidateEnv } from 'utils/validateEnv'
import { logger } from 'utils/logger'

addPath(__dirname)

logger.info('server.ts starting')
ValidateEnv()
;(async () => {
  try {
    const app = new App()
    await app.listen()
  } catch (e) {
    logger.error('An error occurred during the server initialization', e)
    process.exit()
  }
})()
