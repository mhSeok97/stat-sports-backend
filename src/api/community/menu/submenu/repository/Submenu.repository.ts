import { AppDataSource } from 'utils/mysql'
import { SubmenuEntity } from 'api/community/menu/submenu/entity/Submenu.entity'

export const SubmenuRepository = AppDataSource.getRepository(SubmenuEntity).extend({
  findSubmenu() {
    return this.find()
  },

  findSubmenusByMenuId(menuId: number) {
    return this.find({ where: { menu_id: menuId } })
  },
})
