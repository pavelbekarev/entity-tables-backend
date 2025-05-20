import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUserDTO';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('create')
  // async createUser(@Body() data: CreateUserDTO) {
  //   return await this.userService.createUser(data);
  // }

  @Get('getUsers')
  async getUsers() {
    return await this.userService.getUsers();
  }
}
