import { Field, InputType } from '@nestjs/graphql';
import { SignInInput } from './sign-in.input';
import { Lang } from '@prisma/client';

@InputType()
export class SignUpInput extends SignInInput {
  @Field(() => Lang)
  nativeLang: Lang;
}
