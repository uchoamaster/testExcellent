import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column('decimal')
  valorVenda: number;

  @Column('int')
  estoque: number;

  @Column('text', { array: true })
  imagens: string[];
}
