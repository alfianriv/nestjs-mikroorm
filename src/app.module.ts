import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { IdentityModule } from './modules/identity/identity.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [DatabaseModule, IdentityModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
