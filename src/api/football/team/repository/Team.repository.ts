import { AppDataSource } from 'utils/mysql'
import { TeamEntity } from 'api/football/team/entity/Team.entity'

export const TeamRepository = AppDataSource.getRepository(TeamEntity).extend({
  findTeam(leagueId?: number, seasonId?: number) {
    return this.find({
      select: ['id', 'name', 'logo_url', 'stadium'],
    })
  },
})
