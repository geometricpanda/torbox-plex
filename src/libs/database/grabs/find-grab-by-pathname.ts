import { prisma } from '../index';

export const findGrabByPathname = async (pathname: string) =>
  prisma
    .$connect()
    .then(() =>
      prisma.grabs.findFirst({
        where: { release_title: { contains: pathname } },
      })
    )
    .finally(() => prisma.$disconnect());
