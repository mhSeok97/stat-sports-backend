import { Service } from 'typedi'
import { LeagueOutDto } from 'api/football/league/dto/LeagueOut.dto'
import { LeagueRepository } from 'api/football/league/repository/League.repository'
import { LeagueEntity } from 'api/football/league/entity/League.entity'
import { NotFoundError } from 'routing-controllers'

@Service()
export class LeagueService {
  async getLeagues(): Promise<LeagueOutDto[]> {
    const leagues = await LeagueRepository.findLeague()

    return leagues.map(this.convertLeagueToLeagueOutDto)
  }

  private convertLeagueToLeagueOutDto(league: LeagueEntity): LeagueOutDto {
    if (!league) {
      throw new NotFoundError()
    }
    const leagueDto = new LeagueOutDto()
    leagueDto.id = league.id
    leagueDto.name = league.name
    leagueDto.country = league.country
    leagueDto.logoUrl = league.logo_url
    return leagueDto
  }
}
