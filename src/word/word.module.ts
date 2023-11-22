import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordResolver } from './word.resolver';
import { PrismaService } from 'src/prisma.service';
import { FolderService } from 'src/folder/folder.service';

@Module({
  providers: [WordResolver, WordService, FolderService, PrismaService],
})
export class WordModule {}
