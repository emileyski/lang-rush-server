import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType({ isAbstract: true })
export abstract class BaseDto {
  @Field()
  @IsUUID()
  folderId: string;
}
