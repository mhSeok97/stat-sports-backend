import { Service } from 'typedi'
import { LeagueOutDto } from './dto/LeagueOut.dto'
import { LeagueRepository } from './repository/league.repository'
import { League } from './entity/league.entity'
import { NotFoundError } from 'routing-controllers'

@Service()
export class LeagueService {
  async getLeagues(): Promise<LeagueOutDto[]> {
    const leagues = await LeagueRepository.findLeague()

    return leagues.map(this.convertLeagueToLeagueOutDto)
  }

  private convertLeagueToLeagueOutDto(league: League): LeagueOutDto {
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
