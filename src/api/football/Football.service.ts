import { Service } from 'typedi'
import { LeagueOutDto } from './league/dto/LeagueOut.dto'
import { LeagueService } from './league/League.service'
import { TeamOutDto } from './team/dto/TeamOut.dto'
import { TeamService } from './team/Team.service'

@Service()
export class FootballService {
  private readonly leagueService = new LeagueService()
  private readonly teamService = new TeamService()

  async getLeagues(): Promise<LeagueOutDto[]> {
    return await this.leagueService.getLeagues()
  }

  async getTeams(leagueId?: number, seasonId?: number): Promise<TeamOutDto[]> {
    return await this.teamService.getTeams(leagueId, seasonId)
  }
}
