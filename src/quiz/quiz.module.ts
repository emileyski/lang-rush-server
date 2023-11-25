import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [QuizResolver, QuizService, PrismaService],
})
export class QuizModule {}
