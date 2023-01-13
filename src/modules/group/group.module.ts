import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupRepository } from './repository/group.repository';
import { Group } from './entities/group.entity';

@Module({
  controllers: [GroupController],
  providers: [
    GroupService,
    GroupRepository,
    {
      provide: Object,
      useValue: Group,
    },
  ],
  exports: [GroupService],
})
export class GroupModule {}
