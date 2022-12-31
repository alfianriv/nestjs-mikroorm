import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './repository/role.repository';
import { Role } from './entities/role.entity';

@Module({
  controllers: [RoleController],
  providers: [
    RoleService,
    RoleRepository,
    {
      provide: Object,
      useValue: Role,
    },
  ],
  exports: [RoleService],
})
export class RoleModule {}
