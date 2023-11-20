import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class GetUserInput {
  @Field(() => String, { nullable: true })
  @IsUUID()
  @IsOptional()
  id?: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
}
