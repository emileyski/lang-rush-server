import {
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IsUserModelGuard } from './is-user-model.guard';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class IsUserWordGuard extends IsUserModelGuard {
  protected async getFolderlId(context: ExecutionContext): Promise<string> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();

    await this.isValidUUID(args.id);

    const word = await this.prisma.word.findUnique({
      where: { id: args.id },
      select: { folderId: true },
    });

    if (!word?.folderId) {
      throw new NotFoundException('Word not found');
    }

    return word.folderId;
  }
}
