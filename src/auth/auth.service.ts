import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "src/companies/companies.entity";
import { UserRole, Users } from "src/users/users.entity";
import { DataSource, Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private dataSource: DataSource,

        @InjectRepository(Users)
        private userRepository: Repository<Users>,

        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
    ) {}

    async register(registerDto: RegisterDto) {
        const { name, email, password, companyName } = registerDto;

        const existingUser = await this.userRepository.findOne({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return await this.dataSource.transaction(async (manager) => {
            const company = manager.create(Company, {
                name: companyName,
            });

            await manager.save(company);

            const user =  manager.create(Users, {
                name,
                email,
                password:hashedPassword,
                role: UserRole.ADMIN,
                company
            });

            await manager.save(user);

            return {
                message: 'User and Company created successfully',
            };
        });
    }
}