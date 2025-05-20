import { IsEmpty, isNotEmpty, IsNotEmpty } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  userLogin: string;

  @IsNotEmpty()
  userPassword: string;

  @IsNotEmpty()
  state: number;

  middleName: string;

  firstName: string;

  lastName: string;

  comment: string;

  email: string;
}
