import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WordService } from './word.service';
import { Word } from 'src/lib/models';
import { CreateWordInput, TranslateWordInput, UpdateWordInput } from './dto';
import { UserID } from 'src/lib/decorators';
import { UseGuards } from '@nestjs/common';
import { IsUserFolderGuard, IsUserWordGuard } from 'src/lib/guards';

@Resolver()
export class WordResolver {
  constructor(private readonly wordService: WordService) {}

  @Query(() => String)
  async translateWord(
    @UserID() userId: string,
    @Args('data') data: TranslateWordInput,
  ): Promise<string> {
    return this.wordService.translateWord(data.word, userId);
  }

  @Mutation(() => Word)
  @UseGuards(IsUserFolderGuard)
  async createWord(@Args('data') data: CreateWordInput): Promise<Word> {
    return this.wordService.create(data);
  }

  @Query(() => Word)
  @UseGuards(IsUserWordGuard)
  async word(@Args('id') id: string): Promise<Word> {
    return this.wordService.findOne(id);
  }

  @Mutation(() => Word)
  @UseGuards(IsUserWordGuard)
  async updateWord(
    @Args('id') id: string,
    @Args('data') data: UpdateWordInput,
  ): Promise<Word> {
    return this.wordService.update(id, data);
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(IsUserWordGuard)
  async deleteWord(@Args('id') id: string): Promise<void> {
    await this.wordService.delete(id);
  }
}
