import { OpenAPI } from 'routing-controllers-openapi'
import { JsonController, Get, Authorized, QueryParams } from 'routing-controllers'
import { LeagueService } from './league.service'
import { swaggerDocument } from 'config/swagger.config'
import { logger } from 'utils/logger'
import { apiSuccess } from 'api/common/dto/api-util.dto'
import { ParamGetLeague } from './dto/ParamGetLeague.dto'

@OpenAPI({ security: [{ AuthPayload: [] }] })
@JsonController('/leagues')
export class LeagueController {
  constructor(private leagueService: LeagueService) {}

  @Get()
  @Authorized()
  @OpenAPI(swaggerDocument.GET_LEAGUES)
  async getLeagues(@QueryParams() queryParmDto: ParamGetLeague) {
    logger.info(`getting leagues with query params: ${JSON.stringify(queryParmDto)}`)
    const leagues = await this.leagueService.getLeagues()
    logger.info(JSON.stringify(leagues))
    return apiSuccess(leagues)
  }
}
