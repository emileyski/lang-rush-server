import { InputType, OmitType } from '@nestjs/graphql';
import { CreateWordInput } from './create-word.input';

@InputType()
export class UpdateWordInput extends OmitType(CreateWordInput, ['word']) {}
