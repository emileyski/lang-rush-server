import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './lib/guards';
import { FolderModule } from './folder/folder.module';
import { WordModule } from './word/word.module';
import { QuizModule } from './quiz/quiz.module';
import { graphQLExceptionFormat } from './lib/exceptions';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'prod',
      introspection: process.env.NODE_ENV !== 'prod',
      formatError: graphQLExceptionFormat,
    }),
    UserModule,
    AuthModule,
    FolderModule,
    WordModule,
    QuizModule,
    AudioModule,
  ],
  providers: [
    PrismaService,
    {
      provide: 'APP_GUARD',
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
