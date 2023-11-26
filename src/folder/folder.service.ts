import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Folder } from 'src/lib/models';
import { CreateFolderInput, UpdateFolderInput } from './dto';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, data: CreateFolderInput): Promise<Folder> {
    return this.prisma.folder.create({
      data: { ...data, userId },
    });
  }

  findAll(userId: string): Promise<Folder[]> {
    return this.prisma.folder.findMany({
      where: { userId },
    });
  }

  findOne(id: string): Promise<Folder> {
    return this.prisma.folder.findUniqueOrThrow({
      where: { id },
      include: { words: true },
    });
  }

  update(id: string, data: UpdateFolderInput): Promise<Folder> {
    return this.prisma.folder.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.folder.delete({ where: { id } });
  }
}
