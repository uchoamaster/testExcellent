import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  async create(clienteData: Cliente): Promise<Cliente> {
    const novoCliente = this.clienteRepository.create(clienteData);
    return await this.clienteRepository.save(novoCliente);
  }

  async buscarCNPJ(cnpj: string): Promise<Cliente | null> {
    return await this.clienteRepository.findOne({ where: { cnpj } });
  }
}