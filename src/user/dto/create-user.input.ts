import { Field, InputType } from '@nestjs/graphql';
import { Lang, Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Field()
  @Length(8, 20)
  password: string;

  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field(() => Lang)
  nativeLang: Lang;
}
