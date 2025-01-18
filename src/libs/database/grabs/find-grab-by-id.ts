import { prisma } from '../index';

export const findGrabById = async (id: string) =>
  prisma.grabs.findFirst({
    where: { grab_id: id },
  });
