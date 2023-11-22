import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Base } from './base.model';

@ObjectType()
export class Word extends Base {
  @Field()
  word: string;

  @Field()
  translation: string;

  @Field()
  definition: string;

  @Field(() => [String])
  sentences: string[];

  @Field(() => Int)
  progress: number;
}
