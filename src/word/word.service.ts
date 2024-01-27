import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWordInput, UpdateWordInput } from './dto';
import { Word } from 'src/lib/models';
import * as translate from 'translate';
import { UserService } from 'src/user/user.service';
import { AudioService } from 'src/audio/audio.service';

@Injectable()
export class WordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly audioService: AudioService,
  ) {}

  async translateWord(word: string, userId: string): Promise<string> {
    const { nativeLang } = await this.userService.findOne({ id: userId });
    return translate(word, nativeLang);
  }

  async create(createWordInput: CreateWordInput): Promise<Word> {
    const data: CreateWordInput & { audioUrl: string } = {
      ...createWordInput,
      audioUrl: process.env.DEV_WORD_AUDIO_URL,
    };
    if (process.env.NODE_ENV === 'prod') {
      data.audioUrl = await this.audioService.getUrl(data.word);
    }
    return this.prisma.word.create({ data });
  }

  findOne(id: string): Promise<Word> {
    return this.prisma.word.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: string, data: UpdateWordInput): Promise<Word> {
    return this.prisma.word.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.word.delete({ where: { id } });
  }
}
