import { Service } from 'typedi'
import { LeagueOutDto } from './dto/LeagueOut.dto'

@Service()
export class LeagueService {
  async getLeagues(): Promise<LeagueOutDto[]> {
    // const leagues = await LeagueRepository.
    return []
  }
}
