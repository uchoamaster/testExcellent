import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors() // Isso permite todas as origens, você pode configurar mais especificamente se necessário
  await app.listen(3001)
}
bootstrap()

