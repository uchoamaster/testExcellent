import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clienteId: number;

  @Column('json')
  produtos: { produtoId: number; quantidade: number }[];
}
