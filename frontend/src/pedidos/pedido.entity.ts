import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { Cliente } from "../clientes/cliente.entity"
import { PedidoProduto } from "./pedido-produto.entity"

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: "clienteId" })
  cliente: Cliente

  @Column()
  clienteId: number

  @Column("decimal", { precision: 10, scale: 2 })
  total: number

  @OneToMany(
    () => PedidoProduto,
    (pedidoProduto) => pedidoProduto.pedido,
    { cascade: true },
  )
  pedidoProdutos: PedidoProduto[]
}

