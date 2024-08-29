import { Get, JsonController, QueryParam } from 'routing-controllers'
import { FootballService } from 'api/football/Football.service'
import { apiSuccess } from 'api/common/dto/api-util.dto'
import { OpenAPI } from 'routing-controllers-openapi'
import { swaggerDocument } from 'config/swagger.config'
import { logger } from 'utils/logger'

@JsonController('/football')
export class FootballController {
  constructor(private footballService: FootballService) {}

  @Get('/leagues')
  @OpenAPI(swaggerDocument.GET_LEAGUES)
  async getLeagues() {
    logger.info('getting leagues')
    const leagues = await this.footballService.getLeagues()
    logger.info(JSON.stringify(leagues))
    return apiSuccess(leagues)
  }

  @Get('/teams')
  @OpenAPI(swaggerDocument.GET_TEAMS)
  async getTeams(@QueryParam('leagueId') leagueId: number, @QueryParam('seasonId') seasonId: number) {
    logger.info(`getting teams for league id: ${leagueId}, season id: ${seasonId}`)
    const teams = await this.footballService.getTeams(leagueId, seasonId)
    logger.info(JSON.stringify(teams))
    return apiSuccess(teams)
  }
}
