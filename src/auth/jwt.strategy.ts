import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // вытаскивает токен из заголовка Authorization: Bearer ...
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default_jwt_secret', // используй тот же ключ, что и при генерации токена
    });
  }

  async validate(payload: any) {
    // Здесь ты можешь проверить пользователя по БД, если нужно
    return { userId: payload.sub, username: payload.username };
  }
}
