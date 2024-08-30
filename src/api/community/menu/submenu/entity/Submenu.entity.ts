import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ schema: 'community', name: 'submenu' })
export class SubmenuEntity {
  @PrimaryGeneratedColumn({ name: 'submenu_id' })
  submenu_id: number

  @Column({ name: 'submenu_name', type: 'varchar', length: 255 })
  submenu_name: string

  @Column({ name: 'menu_id', type: 'int' })
  menu_id: number

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date
}
