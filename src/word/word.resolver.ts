import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WordService } from './word.service';
import { Word } from 'src/lib/models';
import { CreateWordInput, UpdateWordInput } from './dto';

@Resolver()
export class WordResolver {
  constructor(private readonly wordService: WordService) {}

  @Mutation(() => Word, { nullable: true })
  async createWord(@Args('data') data: CreateWordInput): Promise<Word> {
    return this.wordService.create(data);
  }

  @Query(() => Word)
  async word(@Args('id') id: string): Promise<Word> {
    return this.wordService.findOne(id);
  }

  @Mutation(() => Word, { nullable: true })
  async updateWord(
    @Args('id') id: string,
    @Args('data') data: UpdateWordInput,
  ): Promise<Word> {
    return this.wordService.update(id, data);
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteWord(@Args('id') id: string): Promise<void> {
    await this.wordService.delete(id);
  }
}
