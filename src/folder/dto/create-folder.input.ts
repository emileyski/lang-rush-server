import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateFolderInput {
  @Field()
  @IsString()
  @Length(1, 32)
  name: string;
}
