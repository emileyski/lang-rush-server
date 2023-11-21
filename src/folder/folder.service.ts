import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Folder } from 'src/lib/models';
import { CreateFolderInput, UpdateFolderInput } from './dto';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateFolderInput): Promise<Folder> {
    try {
      return await this.prisma.folder.create({
        data: {
          ...data,
          userId,
        },
      });
    } catch (error) {
      throw new ConflictException('Folder with this name already exists');
    }
  }

  findAll(userId: string): Promise<Folder[]> {
    return this.prisma.folder.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string): Promise<Folder> {
    const folder = await this.prisma.folder.findUnique({ where: { id } });
    if (!folder) {
      throw new NotFoundException('Folder not found');
    }
    return folder;
  }

  async update(id: string, data: UpdateFolderInput): Promise<Folder> {
    await this.findOne(id);
    try {
      return await this.prisma.folder.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new ConflictException('Folder with this name already exists');
    }
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.folder.delete({ where: { id } });
  }
}
