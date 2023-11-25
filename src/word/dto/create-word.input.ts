import { BadRequestException } from '@nestjs/common';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayNotEmpty, Length, Matches } from 'class-validator';
import { TranslateWordInput } from './translate-word.input';
import { WordType } from '@prisma/client';

@InputType()
export class CreateWordInput extends TranslateWordInput {
  @Field()
  @Length(1, 24)
  @Transform(({ value }) => value.toLowerCase())
  @Matches(/^\p{L}+$/u, {
    message: 'Translation must only contain letters.',
  })
  translation: string;

  @Field()
  @Length(1, 255)
  @Transform(({ value }) => transformSentence(value))
  definition: string;

  @Field(() => [String])
  @ArrayNotEmpty()
  @ArrayMaxSize(3)
  @Length(1, 255, { each: true })
  @Transform(({ value }) => value.map((v: string) => transformSentence(v)))
  sentences: string[];

  @Field(() => WordType)
  type: WordType;

  @Field(() => ID)
  folderId: string;
}

function transformSentence(value: string): string {
  const validCharRegex = /^[a-zA-Z0-9 ',.!?]+$/;
  if (!value || !validCharRegex.test(value)) {
    throw new BadRequestException('Invalid sentence');
  }

  let newValue = value.charAt(0).toUpperCase() + value.slice(1);
  const lastChar = newValue.charAt(newValue.length - 1);
  if (lastChar !== '.' && lastChar !== '!' && lastChar !== '?') {
    newValue += '.';
  }

  return newValue;
}
