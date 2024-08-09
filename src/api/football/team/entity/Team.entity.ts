import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'football', name: 'team' })
export class TeamEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'name', nullable: false })
  name: string

  @Column({ name: 'logo_url' })
  logo_url: string

  @Column({ name: 'stadium' })
  stadium: string
}
