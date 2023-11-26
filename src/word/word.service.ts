import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWordInput, UpdateWordInput } from './dto';
import { Word } from 'src/lib/models';
import * as translate from 'translate';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WordService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async translateWord(word: string, userId: string): Promise<string> {
    const { nativeLang } = await this.userService.findOne({ id: userId });
    return translate(word, nativeLang);
  }

  create(data: CreateWordInput): Promise<Word> {
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
