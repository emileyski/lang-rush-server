import { InputType, PartialType, OmitType } from '@nestjs/graphql';
import { CreateWordInput } from './create-word.input';

@InputType()
export class UpdateWordInput extends PartialType(
  OmitType(CreateWordInput, ['word'] as const),
) {}
