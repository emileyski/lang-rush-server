import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFolderInput } from './create-folder.input';

@InputType()
export class UpdateFolderInput extends PartialType(CreateFolderInput) {}
