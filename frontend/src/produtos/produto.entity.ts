import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  descricao: string

  @Column("decimal", { precision: 10, scale: 2 })
  valorVenda: number

  @Column()
  estoque: number

  @Column("simple-array")
  imagens: string[]
}

