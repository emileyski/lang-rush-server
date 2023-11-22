import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateFolderInput {
  @Field()
  @Length(1, 32)
  name: string;
}
