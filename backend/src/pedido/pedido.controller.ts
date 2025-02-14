import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { Pedido } from './pedido.entity';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get()
  findAll(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @Post()
  create(@Body() pedidoData: Pedido): Promise<Pedido> {
    return this.pedidoService.create(pedidoData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.pedidoService.delete(id);
  }
}
