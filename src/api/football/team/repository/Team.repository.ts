import { AppDataSource } from 'utils/mysql'
import { TeamEntity } from '../entity/Team.entity'

export const TeamRepository = AppDataSource.getRepository(TeamEntity).extend({
  findLeague(leagueId?: number, seasonId?: number) {
    const query = this.createQueryBuilder('team').select(['team.id', 'team.name', 'team.logo_url', 'team.stadium'])

    if (leagueId) {
      query.andWhere('team.leagueId = :leagueId', { leagueId })
    }

    if (seasonId) {
      query.innerJoin('team.teamLeagueSeason', 'tls').andWhere('tls.seasonId = :seasonId', { seasonId })
    }

    return query.getMany()
  },
})
