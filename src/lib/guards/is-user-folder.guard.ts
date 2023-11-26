import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IsUserModelGuard } from './is-user-model.guard';

@Injectable()
export class IsUserFolderGuard extends IsUserModelGuard {
  protected async getFolderlId(context: ExecutionContext): Promise<string> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();

    const folderId = args.id || args.data.folderId;
    await this.isValidUUID(folderId);

    return folderId;
  }
}
