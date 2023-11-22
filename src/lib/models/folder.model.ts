import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from './base.model';
import { Word } from './word.model';

@ObjectType()
export class Folder extends Base {
  @Field()
  name: string;

  @Field(() => [Word], { nullable: true })
  words?: Word[];
}
