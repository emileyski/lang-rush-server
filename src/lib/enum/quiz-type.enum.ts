import { registerEnumType } from '@nestjs/graphql';

export enum QuizType {
  WORD_TRANSLATION = 'WORD_TRANSLATION',
  DEFINITION_WORD = 'DEFINITION_WORD',
}

registerEnumType(QuizType, { name: 'QuizType' });
