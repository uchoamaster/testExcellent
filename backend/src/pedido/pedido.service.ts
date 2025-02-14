import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
  ) {}

  async findAll(): Promise<Pedido[]> {
    return await this.pedidoRepository.find();
  }

  async create(pedidoData: Pedido): Promise<Pedido> {
    const novoPedido = this.pedidoRepository.create(pedidoData);
    return await this.pedidoRepository.save(novoPedido);
  }

  async delete(id: number): Promise<void> {
    await this.pedidoRepository.delete(id);
  }
}
