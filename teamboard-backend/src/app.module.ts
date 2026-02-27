import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';


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