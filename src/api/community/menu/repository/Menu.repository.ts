import { AppDataSource } from 'utils/mysql'
import { MenuEntity } from 'api/community/menu/entity/Menu.entity'

export const MenuRepository = AppDataSource.getRepository(MenuEntity).extend({
  findMenu() {
    return this.find()
  },
})
