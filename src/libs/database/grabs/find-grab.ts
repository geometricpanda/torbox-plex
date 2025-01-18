import { Prisma } from '@prisma/client';

import { prisma } from '../index';

export const findGrab = async (where: Prisma.GrabsWhereInput) =>
  prisma
    .$connect()
    .then(() => prisma.grabs.findFirst({ where }))
    .finally(() => prisma.$disconnect());
