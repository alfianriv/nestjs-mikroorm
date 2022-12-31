import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import config from '../../mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        ...config,
      }),
    }),
  ],
})
export class DatabaseModule {}
