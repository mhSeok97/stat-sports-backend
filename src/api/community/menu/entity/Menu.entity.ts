import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { SubmenuEntity } from 'api/community/menu/submenu/entity/Submenu.entity'

@Entity({ schema: 'community', name: 'menu' })
export class MenuEntity {
  @PrimaryGeneratedColumn({ name: 'menu_id' })
  menu_id: number

  @Column({ name: 'menu_name', type: 'varchar', length: 255 })
  menu_name: string

  @Column({ name: 'category_id', type: 'int' })
  category_id: number

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date

  @OneToMany(() => SubmenuEntity, (submenu) => submenu.menu_id)
  submenus: SubmenuEntity[]
}
