import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordResolver } from './word.resolver';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { AudioModule } from 'src/audio/audio.module';

@Module({
  imports: [UserModule, AudioModule],
  providers: [WordResolver, WordService, PrismaService],
})
export class WordModule {}
