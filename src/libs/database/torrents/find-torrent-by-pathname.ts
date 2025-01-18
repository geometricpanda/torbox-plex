import { prisma } from '../index';
import { dbLogger } from '../logger';

const log = dbLogger.extend('find-unique-torrent');

export const findTorrentByPathname = async (pathname: string) => {
  log('Searching for %o in database', pathname);

  return prisma.torrents
    .findUnique({
      include: { grab: true },
      where: { path: pathname },
    })
    .then((torrent) => {
      log('Found %o in database', pathname);
      return torrent;
    })
    .catch((error) => {
      log('Failed to find %o in database', pathname);
      throw error;
    });
};
