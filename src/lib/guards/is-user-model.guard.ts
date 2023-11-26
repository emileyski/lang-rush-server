import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

@Injectable()
export abstract class IsUserModelGuard implements CanActivate {
  constructor(protected prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const { id: userId, role } = req.user;

    const folderId = await this.getFolderlId(context);

    if (role === Role.ADMIN) return true;

    const folder = await this.prisma.folder.findFirst({
      where: { id: folderId, userId },
      select: { id: true },
    });

    return !!folder;
  }

  protected abstract getFolderlId(context: ExecutionContext): Promise<string>;

  protected async isValidUUID(uuid: string): Promise<void> {
    if (!UUID_REGEX.test(uuid)) {
      throw new BadRequestException('Invalid UUID');
    }
  }
}
