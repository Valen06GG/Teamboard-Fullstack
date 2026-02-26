import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Valen06GG',
      database: 'taskforge',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CompaniesModule,
    UsersModule,
    TasksModule,
    ProjectsModule,
    AuthModule,
  ],
})
export class AppModule {}