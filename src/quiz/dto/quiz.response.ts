import { Field, ObjectType } from '@nestjs/graphql';
import { WordForm } from '@prisma/client';
import { IsUUID } from 'class-validator';
import { QuizType } from 'src/lib/enum';

@ObjectType()
export class Quiz {
  @Field(() => QuizType)
  type: QuizType;

  @Field()
  @IsUUID()
  folderId: string;

  @Field(() => [Question])
  questions: Question[];
}

@ObjectType()
export class Question {
  @Field()
  wordId: string;

  @Field()
  question: string;

  @Field(() => WordForm)
  wordForm: WordForm;
}
