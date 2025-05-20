import { IsNotEmpty } from 'class-validator';

export class SignInDTO {
  @IsNotEmpty()
  userLogin: string;

  @IsNotEmpty()
  userPassword: string;
}
