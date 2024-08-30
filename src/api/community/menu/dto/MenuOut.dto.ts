import { SubmenuOutDto } from 'api/community/menu/submenu/dto/SubmenuOut.dto'

export class MenuOutDto {
  menu_id: number
  menu_name: string
  created_at: Date
  updated_at: Date
  category_id: number
  submenus: SubmenuOutDto[]
}
