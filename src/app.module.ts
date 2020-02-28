import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { DatabaseServiceService } from './database/database-service/database-service.service';

@Module({
  imports: [AdminModule],
  controllers: [AppController],
  providers: [AppService,DatabaseServiceService],
})
export class AppModule {}
