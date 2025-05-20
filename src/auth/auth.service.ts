import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDTO } from './dto/SignInDTO';
import { SignUpDTO } from './dto/SignUpDTO';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Метод авторизации пользователя.
   * @param userData - регистрационные данные пользователя
   * @returns access_token
   */
  async signIn(userData: SignInDTO) {
    if (!userData.userLogin) {
      throw new Error('User login is undefined');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        login: userData.userLogin,
      },
    });

    if (user?.password !== userData.userPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '24h', // токен действителен 24ч
      }),
    };
  }

  /**
   * Метод регистрации пользователя. На выходе в базу добавляется новый пользователь
   * @param userData - регистрационные данные пользователя
   * @returns
   */
  async signUp(userData: SignUpDTO) {
    try {
      const hashedPassword = await this.cryptUserPasswordService(
        userData.userPassword,
      );

      const user = await this.prismaService.user.create({
        data: {
          login: userData.userLogin,
          password: hashedPassword,
          state: userData.state,
          lastName: userData.lastName,
          firstName: userData.firstName,
          middleName: userData.middleName,
          email: userData.email,
          comment: userData.comment,
        },
      });

      const payload = { sub: user.id, username: user.login };
      console.log(payload);
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '24h', // токен действителен 24ч
        }),
      };
    } catch (e) {
      console.error(e);
    }
  }

  async cryptUserPasswordService(pass: string) {
    const salt = await bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(pass, salt);
  }
}
