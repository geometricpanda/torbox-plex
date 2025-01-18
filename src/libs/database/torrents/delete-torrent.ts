import { Torrent } from '../../types/torrent';
import { prisma } from '../index';
import { dbLogger } from '../logger';

const log = dbLogger.extend('delete-torrent');

export const deleteTorrent = async (torrent: Torrent) =>
  prisma.torrents
    .deleteMany({ where: { torrent_id: torrent.torrent_id } })
    .then(() => log('Deleted %o', torrent.file))
    .catch((err) => log('Failed for %o, error: %o', torrent.file, err));
