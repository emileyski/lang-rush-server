import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsUUID } from 'class-validator';

@InputType()
export class GetUserInput {
  @Field(() => String, { nullable: true })
  @IsUUID()
  id?: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string;
}
