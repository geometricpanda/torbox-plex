import { Torrent } from '../../types/torrent';
import { prisma } from '../index';
import { dbLogger } from '../logger';

const log = dbLogger.extend('create-torrent');

export interface WriteTorrentToDb {
  file: string;
  path: string;
  type: string;
}

export type CreateTorrent = (torrent: WriteTorrentToDb) => Promise<Torrent>;

export const createTorrent: CreateTorrent = async ({ file, path, type }) => {
  log('Creating new torrent: %o', file);

  return prisma.torrents
    .create({
      data: {
        file,
        path,
        type,
      },
    })
    .then((torrent) => {
      log('Torrent created: %o', file);
      return torrent;
    })
    .catch((error) => {
      log('Failed to create torrent: %o', file);
      throw error;
    });
};
