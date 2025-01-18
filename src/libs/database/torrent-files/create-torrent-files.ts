import { Torrent } from '../../types/torrent';
import { prisma } from '../index';
import { dbLogger } from '../logger';

const log = dbLogger.extend('create-torrent-files');

export const createTorrentFiles = async (
  torrent: Torrent,
  files: Array<string>
) => {
  const inserts = files.map((file) => ({
    torrent_id: torrent.torrent_id,
    file,
  }));

  return prisma.torrentFiles
    .createMany({
      data: inserts,
    })
    .then(() => {
      log('Created %o torrent files for %o', files.length, torrent.file);
    })
    .catch((error) => {
      log('Error creating torrent files for %o', torrent.file, error.message);
      throw error;
    });
};
