import { Service } from 'typedi'
import { LeagueOutDto } from 'api/football/league/dto/LeagueOut.dto'
import { LeagueService } from 'api/football/league/League.service'
import { TeamOutDto } from 'api/football/team/dto/TeamOut.dto'
import { TeamService } from 'api/football/team/Team.service'

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
