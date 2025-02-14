import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { Pedido } from "./pedido.entity"
import { PedidoProduto } from "./pedido-produto.entity"

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidosRepository: Repository<Pedido>,
    @InjectRepository(PedidoProduto)
    private pedidoProdutosRepository: Repository<PedidoProduto>,
  ) {}

  findAll(): Promise<Pedido[]> {
    return this.pedidosRepository.find({ relations: ["cliente", "pedidoProdutos", "pedidoProdutos.produto"] })
  }

  findOne(id: number): Promise<Pedido> {
    return this.pedidosRepository.findOne({
      where: { id },
      relations: ["cliente", "pedidoProdutos", "pedidoProdutos.produto"],
    })
  }

  async create(pedido: Pedido): Promise<Pedido> {
    const novoPedido = await this.pedidosRepository.save(pedido)
    for (const pedidoProduto of pedido.pedidoProdutos) {
      pedidoProduto.pedidoId = novoPedido.id
      await this.pedidoProdutosRepository.save(pedidoProduto)
    }
    return this.findOne(novoPedido.id)
  }

  async update(id: number, pedido: Pedido): Promise<Pedido> {
    await this.pedidosRepository.update(id, { clienteId: pedido.clienteId, total: pedido.total })
    await this.pedidoProdutosRepository.delete({ pedidoId: id })
    for (const pedidoProduto of pedido.pedidoProdutos) {
      pedidoProduto.pedidoId = id
      await this.pedidoProdutosRepository.save(pedidoProduto)
    }
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    await this.pedidoProdutosRepository.delete({ pedidoId: id })
    await this.pedidosRepository.delete(id)
  }
}

