import { prisma } from '../index';
import { dbLogger } from '../logger';

const log = dbLogger.extend('find-orphaned-torrents');

export const findOrphanedTorrents = async () =>
  prisma.torrents
    .findMany({
      where: { grab: null },
    })
    .then((torrents) => {
      log('Found %o orphaned torrents', torrents.length);
      return torrents;
    })
    .catch((error) => {
      log('Error querying orphaned torrents', error.message);
      throw error;
    });
