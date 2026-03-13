import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole, Users } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Company } from 'src/companies/companies.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    async createMember(
      data: { name: string, email: string, password: string },
      adminUser: any,
    ) {
        const existingUser = await this.usersRepository.findOne({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new ConflictException('El correo electrónico ya existe');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = this.usersRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: UserRole.MEMBER,
            company: { id: adminUser.companyId } as Company,
        });

        return this.usersRepository.save(newUser);
    }

    async findAll(companyId: string) {
        return this.usersRepository.find({
            where: {
                company: { id: companyId },
            },
        });
    }

    async deleteUser(id: string, user: any) {
        const targetUser = await this.usersRepository.findOne({
            where: { id },
        });

        if (!targetUser) {
            throw new NotFoundException('Usuario no encontrado');
        }

        return this.usersRepository.remove(targetUser);
    }
}
 