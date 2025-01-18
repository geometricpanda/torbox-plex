import { prisma } from '../index';
import { dbLogger } from '../logger';

const log = dbLogger.extend('find-fileless-torrents');

export const findFilelessTorrents = async () =>
  prisma.torrents
    .findMany({
      where: {
        torbox_id: {
          not: null,
        },
        torbox_hash: {
          not: null,
        },
        torbox_auth_id: {
          not: null,
        },
        torrent_files: {
          none: {},
        },
      },
    })
    .then((torrents) => {
      log('Found %o fileless torrents', torrents.length);
      return torrents;
    })
    .catch((error) => {
      log('Error finding fileless torrents', error.message);
      throw error;
    });
