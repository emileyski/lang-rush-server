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
      if (error.code === 'P2002') {
        throw new ConflictException('Folder with this name already exists');
      } else if (error.code === 'P2003') {
        throw new NotFoundException('User not found');
      }
      throw error;
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
    const folder = await this.prisma.folder.findUnique({
      where: { id },
      include: {
        words: true,
      },
    });
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
