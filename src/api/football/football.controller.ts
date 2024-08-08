import { JsonController, Get, QueryParams } from "routing-controllers"
import { FootballService } from "./football.service"
import { apiSuccess } from "api/common/dto/api-util.dto"
import { ParamGetLeague } from "./league/dto/ParamGetLeague.dto"

@JsonController("/football")
export class FootballController {
  constructor(private footballService: FootballService) {}

  @Get("/leagues")
  async getFootballLeagues(@QueryParams() queryParmDto: ParamGetLeague) {
    const leagues = await this.footballService.getFootballLeagues(queryParmDto)

    return apiSuccess(leagues)
  }
}
