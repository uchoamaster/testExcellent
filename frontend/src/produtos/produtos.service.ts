import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { Produto } from "./produto.entity"

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtosRepository: Repository<Produto>,
  ) {}

  findAll(): Promise<Produto[]> {
    return this.produtosRepository.find()
  }

  findOne(id: number): Promise<Produto> {
    return this.produtosRepository.findOne({ where: { id } })
  }

  create(produto: Produto): Promise<Produto> {
    return this.produtosRepository.save(produto)
  }

  async update(id: number, produto: Produto): Promise<Produto> {
    await this.produtosRepository.update(id, produto)
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    await this.produtosRepository.delete(id)
  }
}

