import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const deletedUsers = await prisma.user.deleteMany();
  console.log(`Deleted users: ${deletedUsers.count}`);

  const deletedSessions = await prisma.session.deleteMany();
  console.log(`Deleted sessions: ${deletedSessions.count}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
