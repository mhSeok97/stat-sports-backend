import { Service } from 'typedi'
import { NotFoundError } from 'routing-controllers'
import { SubmenuEntity } from 'api/community/menu/submenu/entity/Submenu.entity'
import { SubmenuOutDto } from 'api/community/menu/submenu/dto/SubmenuOut.dto'
import { SubmenuRepository } from './repository/Submenu.repository'
import { CreateSubmenuDto } from 'api/community/menu/submenu/dto/CreateSubmenu.dto'
import { UpdateSubmenuDto } from 'api/community/menu/submenu/dto/UpdateSubmenu.dto'

@Service()
export class SubmenuService {
  async getSubmenus(): Promise<SubmenuOutDto[]> {
    const submenus = await SubmenuRepository.findSubmenu()
    return submenus.map(this.convertSubmenuToSubmenuOutDto)
  }

  async getSubmenuById(submenuId: number): Promise<SubmenuOutDto> {
    const submenu = await SubmenuRepository.findOne({ where: { submenu_id: submenuId } })
    if (!submenu) {
      throw new NotFoundError('Submenu not found')
    }
    return this.convertSubmenuToSubmenuOutDto(submenu)
  }

  async getSubmenusByMenuId(menuId: number): Promise<SubmenuOutDto[]> {
    const submenus = await SubmenuRepository.findSubmenusByMenuId(menuId)
    if (!submenus || submenus.length === 0) {
      throw new NotFoundError('No submenus found for this menu')
    }
    return submenus.map(this.convertSubmenuToSubmenuOutDto)
  }

  async createSubmenu(createSubmenuDto: CreateSubmenuDto): Promise<SubmenuOutDto> {
    const submenu = SubmenuRepository.create(createSubmenuDto)
    const savedSubmenu = await SubmenuRepository.save(submenu)
    return this.convertSubmenuToSubmenuOutDto(savedSubmenu)
  }

  async updateSubmenu(submenuId: number, updateSubmenuDto: UpdateSubmenuDto): Promise<SubmenuOutDto> {
    const submenu = await SubmenuRepository.findOne({ where: { submenu_id: submenuId } })
    if (!submenu) {
      throw new NotFoundError('Submenu not found')
    }
    await SubmenuRepository.update(submenuId, updateSubmenuDto)
    const updatedSubmenu = await SubmenuRepository.findOne({ where: { submenu_id: submenuId } })
    return this.convertSubmenuToSubmenuOutDto(updatedSubmenu)
  }

  async deleteSubmenu(submenuId: number): Promise<void> {
    const submenu = await SubmenuRepository.findOne({ where: { submenu_id: submenuId } })
    if (!submenu) {
      throw new NotFoundError('Submenu not found')
    }
    await SubmenuRepository.delete(submenuId)
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
