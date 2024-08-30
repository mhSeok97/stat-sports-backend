import { Service } from 'typedi'
import { NotFoundError } from 'routing-controllers'
import { SubmenuEntity } from 'api/community/menu/submenu/entity/Submenu.entity'
import { SubmenuOutDto } from 'api/community/menu/submenu/dto/SubmenuOut.dto'
import { SubmenuRepository } from './repository/Submenu.repository'

@Service()
export class SubmenuService {
  async getSubmenus(): Promise<SubmenuOutDto[]> {
    const submenus = await SubmenuRepository.findSubmenu()

    return submenus.map(this.convertSubmenuToSubmenuOutDto)
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
