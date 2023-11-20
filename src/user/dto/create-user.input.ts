import { Field, InputType } from '@nestjs/graphql';
import { Lang, Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Field()
  @IsString()
  @Length(8, 20)
  password: string;

  @Field(() => Role, { nullable: true })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @Field(() => Lang)
  @IsEnum(Lang)
  nativeLang: Lang;
}
