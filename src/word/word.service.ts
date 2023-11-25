import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWordInput, UpdateWordInput } from './dto';
import { Word } from 'src/lib/models';
import { FolderService } from 'src/folder/folder.service';
import * as translate from 'translate';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WordService {
  constructor(
    private folderService: FolderService,
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async translateWord(word: string, userId: string): Promise<string> {
    const { nativeLang } = await this.userService.findOne({ id: userId });
    return translate(word, nativeLang);
  }

  async create(data: CreateWordInput): Promise<Word> {
    try {
      return await this.prisma.word.create({ data });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('This word already exists');
      }
      if (error.code === 'P2003') {
        throw new NotFoundException('Folder not found');
      }
      throw error;
    }
  }

  async findOne(id: string): Promise<Word> {
    const word = await this.prisma.word.findUnique({
      where: { id },
    });
    if (!word) {
      throw new ConflictException('Word not found');
    }
    return word;
  }

  async update(id: string, data: UpdateWordInput): Promise<Word> {
    await this.findOne(id);
    try {
      return await this.prisma.word.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new ConflictException('This word already exists');
    }
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.word.delete({ where: { id } });
  }
}
