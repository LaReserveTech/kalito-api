import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  address: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  commune: string;
}
