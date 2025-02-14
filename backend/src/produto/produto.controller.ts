import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Post()
  create(@Body() produtoData: Produto): Promise<Produto> {
    return this.produtoService.create(produtoData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() produtoData: Produto): Promise<Produto> {
    return this.produtoService.update(id, produtoData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.produtoService.delete(id);
  }
}
