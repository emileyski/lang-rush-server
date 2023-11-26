import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FolderService } from './folder.service';
import { Folder } from 'src/lib/models';
import { UserID } from 'src/lib/decorators';
import { CreateFolderInput, UpdateFolderInput } from './dto';
import { UseGuards } from '@nestjs/common';
import { IsUserFolderGuard } from 'src/lib/guards';

@Resolver()
export class FolderResolver {
  constructor(private readonly folderService: FolderService) {}

  @Mutation(() => Folder)
  async createFolder(
    @UserID() userId: string,
    @Args('data') data: CreateFolderInput,
  ): Promise<Folder> {
    return this.folderService.create(userId, data);
  }

  @Query(() => [Folder])
  folders(@UserID() userId: string): Promise<Folder[]> {
    return this.folderService.findAll(userId);
  }

  @Query(() => Folder)
  @UseGuards(IsUserFolderGuard)
  folder(@Args('id') id: string): Promise<Folder> {
    return this.folderService.findOne(id);
  }

  @Mutation(() => Folder)
  @UseGuards(IsUserFolderGuard)
  async updateFolder(
    @Args('id') id: string,
    @Args('data') data: UpdateFolderInput,
  ): Promise<Folder> {
    return this.folderService.update(id, data);
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(IsUserFolderGuard)
  deleteFolder(@Args('id') id: string): Promise<void> {
    return this.folderService.delete(id);
  }
}
