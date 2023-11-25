import { Field, InputType } from '@nestjs/graphql';
import { QuizType } from 'src/lib/enum';
import { BaseDto } from './base.input';

@InputType()
export class AnswersInput extends BaseDto {
  @Field(() => QuizType)
  quizType: QuizType;

  @Field(() => [Answer])
  answers: Answer[];
}

@InputType()
export class Answer {
  @Field()
  wordId: string;

  @Field()
  answer: string;
}
