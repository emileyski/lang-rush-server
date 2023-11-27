import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Word } from 'src/lib/models';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { Answer, AnswersInput, Question, QuestionsInput, Quiz } from './dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async questions(data: QuestionsInput): Promise<Quiz> {
    const { folderId, quizType } = data;
    const questionField = quizType.toLowerCase().split('_')[0];

    const folder = await this.prisma.folder.findUnique({
      where: { id: folderId },
      select: { _count: { select: { words: true } } },
    });

    if (!folder) throw new NotFoundException('Folder not found');

    const count = folder._count.words;
    if (count < 5) throw new BadRequestException('Not enough words');

    const field = Prisma.sql([questionField]);
    const questions: Question[] = await this.prisma.$queryRaw<Question[]>`
      SELECT 
        "id" AS "wordId", 
        ${field} AS "question", 
        "form" AS "wordForm"
      FROM "Word"
      WHERE "folderId" = ${folderId}
      AND "progress" = (
        SELECT MIN("progress")
        FROM "Word"
        WHERE "folderId" = ${folderId}
      )
    `;

    return {
      type: quizType,
      folderId,
      questions,
    };
  }

  async answers(data: AnswersInput): Promise<Word[]> {
    const { folderId, quizType, answers } = data;
    const answerField = quizType.toLowerCase().split('_')[1];

    const field = Prisma.sql([answerField]);

    const words: Answer[] = await this.prisma.$queryRaw<Answer[]>`
      SELECT "id" AS "wordId", ${field} AS "answer"
      FROM "Word"
      WHERE "folderId" = ${folderId}
      AND "id" IN (${Prisma.join(answers.map(({ wordId }) => wordId))})
    `;

    if (words.length !== answers.length) {
      throw new BadRequestException('Invalid answers');
    }

    const correctAnswers = [];
    const incorrectAnswers = [];

    answers.forEach((word, index) => {
      if (word.answer === words[index].answer) {
        correctAnswers.push(word.wordId);
      } else {
        incorrectAnswers.push(word.wordId);
      }
    });

    await this.prisma.$queryRaw`
      UPDATE "Word"
      SET "progress" = "progress" + 1
      WHERE "id" IN (${Prisma.join(correctAnswers)})
    `;

    return this.prisma.word.findMany({
      where: {
        id: { in: answers.map(({ wordId }) => wordId) },
      },
    });
  }
}
