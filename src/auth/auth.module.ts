import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Company } from 'src/companies/companies.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Users, Company])],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
