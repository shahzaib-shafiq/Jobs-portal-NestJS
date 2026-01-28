import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { SavedJobModule } from './saved-job/saved-job.module';
import { NotificationModule } from './notification/notification.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { OffersModule } from './offers/offers.module';
import { RefralsModule } from './refrals/refrals.module';
import { InterviewsModule } from './interviews/interviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    CompanyModule,
    JobModule,
    ApplicationModule,
    SavedJobModule,
    NotificationModule,
    AssessmentsModule,
    OffersModule,
    RefralsModule,
    InterviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
