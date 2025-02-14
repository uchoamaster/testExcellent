import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Pedido } from "./pedido.entity"
import { Produto } from "../produtos/produto.entity"

@Entity()
export class PedidoProduto {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => Pedido,
    (pedido) => pedido.pedidoProdutos,
  )
  @JoinColumn({ name: "pedidoId" })
  pedido: Pedido

  @Column()
  pedidoId: number

  @ManyToOne(() => Produto)
  @JoinColumn({ name: "produtoId" })
  produto: Produto

  @Column()
  produtoId: number

  @Column()
  quantidade: number
}

