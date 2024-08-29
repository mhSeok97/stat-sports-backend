import { Service } from 'typedi'
import { NotFoundError } from 'routing-controllers'
import { TeamOutDto } from 'api/football/team/dto/TeamOut.dto'
import { TeamEntity } from 'api/football/team/entity/Team.entity'
import { TeamRepository } from 'api/football/team/repository/Team.repository'

@Service()
export class TeamService {
  async getTeams(leagueId?: number, seasonId?: number): Promise<TeamOutDto[]> {
    const teams = await TeamRepository.findTeam(leagueId, seasonId)
    return teams.map(this.convertTeamToTeamOutDto)
  }

  private convertTeamToTeamOutDto(team: TeamEntity): TeamOutDto {
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
