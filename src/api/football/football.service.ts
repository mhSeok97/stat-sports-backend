import { Service } from "typedi"
import { LeagueOutDto } from "./league/dto/LeagueOut.dto"
import { ParamGetLeague } from "./league/dto/ParamGetLeague.dto"

@Service()
export class FootballService {
  async getFootballLeagues(queryParmDto: ParamGetLeague): Promise<LeagueOutDto> {
    return new LeagueOutDto()
  }
}
