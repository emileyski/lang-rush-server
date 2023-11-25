import { Field, InputType } from '@nestjs/graphql';
import { QuizType } from 'src/lib/enum';
import { BaseDto } from './base.input';

@InputType()
export class QuestionsInput extends BaseDto {
  @Field(() => QuizType)
  quizType: QuizType;
}
