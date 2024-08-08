import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('league')
export class League {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'name' })
  name: string

  @Column()
  label_en: string

  @Column()
  label_ko: string

  @Column({ name: 'logo_url' })
  logo_url: string

  @Column({ name: 'country' })
  country: string
}
