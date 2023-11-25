import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Base } from './base.model';
import { WordType } from '@prisma/client';

registerEnumType(WordType, { name: 'WordType' });

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

  @Field(() => WordType)
  type: WordType;
}
