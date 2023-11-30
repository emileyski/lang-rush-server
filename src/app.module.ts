import { HttpException, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './lib/guards';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
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
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: eval(process.env.REDIS_TTL),
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
