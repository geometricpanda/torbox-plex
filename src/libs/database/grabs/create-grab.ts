import { Prisma } from '@prisma/client';

import { prisma } from '@/libs/database';

export const createGrab = async (data: Prisma.GrabsCreateInput) =>
  prisma
    .$connect()
    .then(() =>
      prisma.grabs.create({
        data: {
          title: data.title,
          folder_path: data.folder_path,
          release_title: data.release_title,
          arr: data.arr,
          arr_id: data.arr_id,
        },
      })
    )
    .finally(() => prisma.$disconnect());
