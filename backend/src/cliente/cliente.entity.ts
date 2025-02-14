import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  razaoSocial: string;

  @Column()
  cnpj: string;

  @Column()
  email: string;
}
