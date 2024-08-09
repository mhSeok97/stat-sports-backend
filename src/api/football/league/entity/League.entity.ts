import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'football', name: 'league' })
export class LeagueEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'name', nullable: false })
  name: string

  @Column({ name: 'label_en', nullable: false })
  label_en: string

  @Column({ name: 'label_ko', nullable: false })
  label_ko: string

  @Column({ name: 'logo_url' })
  logo_url: string

  @Column({ name: 'country' })
  country: string
}
