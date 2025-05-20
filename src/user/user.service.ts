import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/CreateUserDTO';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  //УСТАРЕЛО создание пользователя реализовано в ../auth/auth.service.ts
  /*
  async createUser(data: CreateUserDTO) {
    try {
      return await this.prismaService.user.create({
        data: {
          login: data.login,
          password: data.password,
          state: data.state,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
    */
  //

  async getUsers() {
    try {
      return await this.prismaService.user.findMany();
    } catch (e) {
      console.error(e);
    }
  }
}
