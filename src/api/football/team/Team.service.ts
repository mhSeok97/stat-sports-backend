import { Service } from 'typedi'
import { NotFoundError } from 'routing-controllers'
import { TeamOutDto } from './dto/TeamOut.dto'
import { TeamEntity } from './entity/Team.entity'
import { TeamRepository } from './repository/Team.repository'

@Service()
export class TeamService {
  async getTeams(leagueId?: number, seasonId?: number): Promise<TeamOutDto[]> {
    const teams = await TeamRepository.findLeague(leagueId, seasonId)
    return teams.map(this.convertTeamToLeagueOutDto)
  }

  private convertTeamToLeagueOutDto(team: TeamEntity): TeamOutDto {
    if (!team) {
      throw new NotFoundError()
    }
    const teamDto = new TeamOutDto()
    teamDto.id = team.id
    teamDto.name = team.name
    teamDto.logoUrl = team.logo_url
    teamDto.stadium = team.stadium
    return teamDto
  }
}
