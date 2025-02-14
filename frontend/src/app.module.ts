import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ClientesModule } from "./clientes/clientes.module"
import { ProdutosModule } from "./produtos/produtos.module"
import { PedidosModule } from "./pedidos/pedidos.module"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost", // ou o IP do seu container Docker
      port: 3306,
      username: "root", // ou o usuário que você configurou
      password: "", // a senha que você configurou
      database: "crud_nestjs", // o nome do banco de dados
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true, // Cuidado ao usar isso em produção
    }),
    ClientesModule,
    ProdutosModule,
    PedidosModule,
  ],
})
export class AppModule {}

