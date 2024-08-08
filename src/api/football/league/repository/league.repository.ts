import { AppDataSource } from 'utils/mysql'
import { League } from '../entity/league.entity'

export const LeagueRepository = AppDataSource.getRepository(League).extend({
  findLeague() {
    return this.find({
      select: ['id', 'name', 'label_en', 'label_ko', 'logo_url', 'country'],
    })
  },
})
