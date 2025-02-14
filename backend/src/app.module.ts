import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClienteModule } from './cliente/cliente.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql', // ou 'mysql'
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'meubanco',
      autoLoadEntities: true,
      synchronize: false, // Apenas para desenvolvimento
    }),
    ClienteModule,
    ProdutoModule,
    PedidoModule,
  ],
})
export class AppModule {}
console.log({
  type: 'mysql', // ou 'mysql'
  host: process.env.DB_HOST || '127.0.0.1',
  port:3306, //parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'meubanco',
  autoLoadEntities: true,
  synchronize: false, // Apenas para desenvolvimento
})
