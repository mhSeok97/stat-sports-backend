import { JsonController, Get } from 'routing-controllers'
import { FootballService } from './football.service'
import { apiSuccess } from 'api/common/dto/api-util.dto'

@JsonController('/football')
export class FootballController {
  constructor(private footballService: FootballService) {}

  @Get('/leagues')
  async getFootballLeagues() {
    const leagues = await this.footballService.getLeagues()

    return apiSuccess(leagues)
  }
}
