import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { Cliente } from "./cliente.entity"

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}

  findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find()
  }

  findOne(id: number): Promise<Cliente> {
    return this.clientesRepository.findOne({ where: { id } })
  }

  create(cliente: Cliente): Promise<Cliente> {
    return this.clientesRepository.save(cliente)
  }

  async update(id: number, cliente: Cliente): Promise<Cliente> {
    await this.clientesRepository.update(id, cliente)
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    await this.clientesRepository.delete(id)
  }
}

