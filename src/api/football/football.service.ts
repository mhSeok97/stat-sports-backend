import { Service } from 'typedi'
import { LeagueOutDto } from './league/dto/LeagueOut.dto'
import { LeagueService } from './league/league.service'

@Service()
export class FootballService {
  private readonly leagueService = new LeagueService()

  async getLeagues(): Promise<LeagueOutDto[]> {
    const leagues = await this.leagueService.getLeagues()
    return leagues
  }
}
