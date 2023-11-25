import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QuizService } from './quiz.service';
import { Quiz } from './dto/quiz.response';
import { QuestionsInput } from './dto/questions.input';
import { AnswersInput } from './dto/answers.input';
import { Word } from 'src/lib/models';

@Resolver()
export class QuizResolver {
  constructor(private readonly quizService: QuizService) {}

  @Query(() => Quiz)
  async questions(@Args('data') data: QuestionsInput) {
    return this.quizService.questions(data);
  }

  @Mutation(() => [Word])
  async answers(@Args('data') data: AnswersInput) {
    return this.quizService.answers(data);
  }
}
