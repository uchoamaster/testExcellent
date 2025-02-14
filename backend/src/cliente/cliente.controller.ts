import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import { Cliente } from './cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Post()
  create(@Body() clienteData: Cliente): Promise<Cliente> {
    return this.clienteService.create(clienteData);
  }

  @Get(':cnpj')
  buscarCNPJ(@Param('cnpj') cnpj: string): Promise<any> {
    return this.clienteService.buscarCNPJ(cnpj);
  }
}
