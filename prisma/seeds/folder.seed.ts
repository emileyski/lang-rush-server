import { Prisma } from '@prisma/client';

export const folders: Prisma.FolderUpsertArgs['create'][] = [
  {
    id: '9e391faf-64b2-4d4c-b879-463532920ff1',
    name: 'Customer Folder 1',
    userId: '9e391faf-64b2-4d4c-b879-463532920fd2',
  },
  {
    id: '9e391faf-64b2-4d4c-b879-463532920ff2',
    name: 'Customer Folder 2',
    userId: '9e391faf-64b2-4d4c-b879-463532920fd2',
  },
  {
    id: '9e391faf-64b2-4d4c-b879-463532920ff3',
    name: 'Admin Folder 1',
    userId: '9e391faf-64b2-4d4c-b879-463532920fd1',
  },
  {
    id: '9e391faf-64b2-4d4c-b879-463532920ff4',
    name: 'Admin Folder 2',
    userId: '9e391faf-64b2-4d4c-b879-463532920fd1',
  },
];
