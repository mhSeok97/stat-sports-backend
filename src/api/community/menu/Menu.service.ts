import { Service } from 'typedi'
import { NotFoundError } from 'routing-controllers'
import { MenuEntity } from 'api/community/menu/entity/Menu.entity'
import { MenuOutDto } from 'api/community/menu/dto/MenuOut.dto'
import { MenuRepository } from 'api/community/menu/repository/Menu.repository'
import { SubmenuOutDto } from 'api/community/menu/submenu/dto/SubmenuOut.dto'
import { SubmenuEntity } from 'api/community/menu/submenu/entity/Submenu.entity'
import { CreateMenuDto } from 'api/community/menu/dto/CreateMenu.dto'
import { UpdateMenuDto } from 'api/community/menu/dto/UpdateMenu.dto'
import { SubmenuRepository } from 'api/community/menu/submenu/repository/Submenu.repository'

@Service()
export class MenuService {
  async getMenus(): Promise<MenuOutDto[]> {
    const menus = await MenuRepository.findMenu()
    return Promise.all(
      menus.map(async (menu) => {
        const submenus = await SubmenuRepository.find({ where: { menu_id: menu.menu_id } })
        return this.convertMenuToMenuOutDto(menu, submenus)
      }),
    )
  }

  async getMenuById(menuId: number): Promise<MenuOutDto> {
    const menu = await MenuRepository.findOne({ where: { menu_id: menuId } })
    if (!menu) {
      throw new NotFoundError('Menu not found')
    }
    const submenus = await SubmenuRepository.find({ where: { menu_id: menuId } })
    return this.convertMenuToMenuOutDto(menu, submenus)
  }

  async getMenusByCategoryId(categoryId: number): Promise<MenuOutDto[]> {
    const menus = await MenuRepository.findMenusByCategoryId(categoryId)
    if (!menus || menus.length === 0) {
      throw new NotFoundError('No menus found for this category')
    }
    return Promise.all(
      menus.map(async (menu) => {
        const submenus = await SubmenuRepository.find({ where: { menu_id: menu.menu_id } })
        return this.convertMenuToMenuOutDto(menu, submenus)
      }),
    )
  }

  async createMenu(createMenuDto: CreateMenuDto): Promise<MenuOutDto> {
    const menu = MenuRepository.create(createMenuDto)
    const savedMenu = await MenuRepository.save(menu)
    const submenus = await SubmenuRepository.find({ where: { menu_id: savedMenu.menu_id } })
    return this.convertMenuToMenuOutDto(savedMenu, submenus)
  }

  async updateMenu(menuId: number, updateMenuDto: UpdateMenuDto): Promise<MenuOutDto> {
    const menu = await MenuRepository.findOne({ where: { menu_id: menuId } })
    if (!menu) {
      throw new NotFoundError('Menu not found')
    }
    await MenuRepository.update(menuId, updateMenuDto)
    const updatedMenu = await MenuRepository.findOne({ where: { menu_id: menuId } })
    const submenus = await SubmenuRepository.find({ where: { menu_id: updatedMenu.menu_id } })
    return this.convertMenuToMenuOutDto(updatedMenu, submenus)
  }

  async deleteMenu(menuId: number): Promise<void> {
    const menu = await MenuRepository.findOne({ where: { menu_id: menuId } })
    if (!menu) {
      throw new NotFoundError('Menu not found')
    }
    await MenuRepository.delete(menuId)
  }

  private convertMenuToMenuOutDto(menu: MenuEntity, submenus: SubmenuEntity[]): MenuOutDto {
    const menuDto = new MenuOutDto()
    menuDto.menu_id = menu.menu_id
    menuDto.menu_name = menu.menu_name
    menuDto.created_at = menu.created_at
    menuDto.updated_at = menu.updated_at
    menuDto.category_id = menu.category_id
    menuDto.submenus = submenus.map(this.convertSubmenuToSubmenuOutDto)
    return menuDto
  }

  private convertSubmenuToSubmenuOutDto(submenu: SubmenuEntity): SubmenuOutDto {
    const submenuDto = new SubmenuOutDto()
    submenuDto.submenu_id = submenu.submenu_id
    submenuDto.menu_id = submenu.menu_id
    submenuDto.submenu_name = submenu.submenu_name
    submenuDto.created_at = submenu.created_at
    submenuDto.updated_at = submenu.updated_at
    return submenuDto
  }
}
