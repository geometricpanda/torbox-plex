import { Torrent } from '../../types/torrent';
import { prisma } from '../index';
import { dbLogger } from '../logger';

const log = dbLogger.extend('increment-torrent-info-errors');

export const incrementTorrentInfoErrors = async (torrent: Torrent) => {
  const torrent_info_errors = torrent.torrent_info_errors + 1;
  const torrent_info_last_error = new Date();

  return prisma.torrents
    .updateMany({
      where: { torrent_id: torrent.torrent_id },
      data: {
        torrent_info_errors,
        torrent_info_last_error,
      },
    })
    .then(() => {
      log('Logged error for %o', torrent.file);
    })
    .catch((error) => {
      log('Error logging error info for %o', torrent.file, error.message);
      throw error;
    });
};
