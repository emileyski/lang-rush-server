import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordResolver } from './word.resolver';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [WordResolver, WordService, PrismaService],
})
export class WordModule {}
