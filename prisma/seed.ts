import { PrismaClient } from '@prisma/client';
import { createUsers } from './seeds/user.seed';
import { folders } from './seeds/folder.seed';

const prisma = new PrismaClient();

async function main() {
  async function upsertData<T>(data: T[], model: string) {
    const promises = data.map((item) =>
      prisma[model].upsert({
        where: { id: item['id'] },
        update: {},
        create: item,
      }),
    );

    await Promise.all(promises);
    console.log(`Created ${data.length} ${model}s`);
  }

  const users = await createUsers();

  await upsertData(users, 'user');
  await upsertData(folders, 'folder');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
