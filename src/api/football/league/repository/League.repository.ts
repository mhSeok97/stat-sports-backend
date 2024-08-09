import { AppDataSource } from 'utils/mysql'
import { LeagueEntity } from '../entity/League.entity'

export const LeagueRepository = AppDataSource.getRepository(LeagueEntity).extend({
  findLeague() {
    return this.find({
      select: ['id', 'name', 'label_en', 'label_ko', 'logo_url', 'country'],
    })
  },
})
