import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderResolver } from './folder.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [FolderResolver, FolderService, PrismaService],
  exports: [FolderService],
})
export class FolderModule {}
