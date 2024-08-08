import { LeagueOutDto } from './LeagueOut.dto'

export class LeagueListOutDto {
  constructor(leagues: LeagueOutDto[]) {
    this.leagues = leagues
  }
  leagues: LeagueOutDto[]
}
