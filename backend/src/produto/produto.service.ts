import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find();
  }

  async create(produtoData: Produto): Promise<Produto> {
    const novoProduto = this.produtoRepository.create(produtoData);
    return await this.produtoRepository.save(novoProduto);
  }

  async update(id: number, produtoData: Produto): Promise<Produto> {
    await this.produtoRepository.update(id, produtoData);
    const produto = await this.produtoRepository.findOne({ where: { id } });
    if (!produto) {
      throw new Error(`Produto with id ${id} not found`);
    }
    return produto;
  }

  async delete(id: number): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
