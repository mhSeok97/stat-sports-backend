import { Service } from 'typedi'
import { NotFoundError } from 'routing-controllers'
import { MenuEntity } from 'api/community/menu/entity/Menu.entity'
import { MenuOutDto } from 'api/community/menu/dto/MenuOut.dto'
import { MenuRepository } from 'api/community/menu/repository/Menu.repository'
import { SubmenuOutDto } from 'api/community/menu/submenu/dto/SubmenuOut.dto'
import { SubmenuEntity } from 'api/community/menu/submenu/entity/Submenu.entity'

@Service()
export class MenuService {
  async getMenus(): Promise<MenuOutDto[]> {
    const menus = await MenuRepository.findMenu()

    return menus.map(this.convertMenuToMenuOutDto)
  }

  private convertMenuToMenuOutDto(menu: MenuEntity): MenuOutDto {
    if (!menu) {
      throw new NotFoundError()
    }
    const menuDto = new MenuOutDto()
    menuDto.menu_id = menu.menu_id
    menuDto.menu_name = menu.menu_name
    menuDto.created_at = menu.created_at
    menuDto.updated_at = menu.updated_at
    menuDto.category_id = menu.category_id
    menuDto.submenus = menu.submenus.map((submenu) => this.convertSubmenuToSubmenuOutDto(submenu))
    return menuDto
  }

  private convertSubmenuToSubmenuOutDto(submenu: SubmenuEntity): SubmenuOutDto {
    if (!submenu) {
      throw new NotFoundError()
    }
    const submenuDto = new SubmenuOutDto()
    submenuDto.submenu_id = submenu.submenu_id
    submenuDto.menu_id = submenu.menu_id
    submenuDto.submenu_name = submenu.submenu_name
    submenuDto.created_at = submenu.created_at
    submenuDto.updated_at = submenu.updated_at
    return submenuDto
  }
}
