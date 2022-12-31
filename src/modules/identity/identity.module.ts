import { Module } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { IdentityController } from './identity.controller';
import { IdentityRepository } from './repository/identity.repository';
import { Identity } from './entities/identity.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [RoleModule],
  controllers: [IdentityController],
  providers: [
    IdentityService,
    IdentityRepository,
    {
      provide: Object,
      useValue: Identity,
    },
  ],
  exports: [IdentityService],
})
export class IdentityModule {}
