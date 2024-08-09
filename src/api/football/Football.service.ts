import { Service } from 'typedi'
import { LeagueOutDto } from './league/dto/LeagueOut.dto'
import { LeagueService } from './league/League.service'

@Service()
export class FootballService {
  private readonly leagueService = new LeagueService()

  async getLeagues(): Promise<LeagueOutDto[]> {
    return await this.leagueService.getLeagues()
  }
}
