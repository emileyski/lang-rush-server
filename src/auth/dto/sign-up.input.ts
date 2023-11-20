import { Field, InputType } from '@nestjs/graphql';
import { SignInInput } from './sign-in.input';
import { Lang } from '@prisma/client';
import { IsEnum } from 'class-validator';

@InputType()
export class SignUpInput extends SignInInput {
  @Field(() => Lang)
  @IsEnum(Lang)
  nativeLang: Lang;
}
