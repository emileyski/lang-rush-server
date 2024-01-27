import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateUserInput,
  GetUserInput,
  GetUsersInput,
  UpdateUserInput,
} from './dto';
import { User } from 'src/lib/models';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: GetUsersInput): Promise<User[]> {
    return this.prisma.user.findMany(params);
  }

  async findOne(where: GetUserInput): Promise<User> {
    if (Object.keys(where).length === 0) {
      throw new BadRequestException('Please provide id or email');
    }

    const user = await this.prisma.user.findUnique({ where });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(data: CreateUserInput): Promise<User> {
    data.password = await hash(data.password);
    return this.prisma.user.create({ data });
  }

  async update(where: GetUserInput, data: UpdateUserInput): Promise<User> {
    if (Object.keys(data).length === 0) {
      throw new BadRequestException('Please provide data to update');
    }

    await this.findOne(where);

    if (data.password) {
      data.password = await hash(data.password);
    }

    return this.prisma.user.update({ where, data });
  }

  async delete(where: GetUserInput): Promise<void> {
    await this.findOne(where);
    await this.prisma.user.delete({ where });
  }
}
