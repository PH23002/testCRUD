import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class categories {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  name: string;
}
