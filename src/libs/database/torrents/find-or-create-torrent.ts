import { computeTorrentStatus } from '../../utils/compute-torrent-status';
import { dbLogger } from '../logger';
import { createTorrent } from './create';
import { findTorrentByPathname } from './find-torrent-by-pathname';

const log = dbLogger.extend('find-or-create-torrent');

export interface FindOrCreateTorrent {
  basename: string;
  fullpath: string;
  ext: string;
  source: 'torrent-blackhole' | 'radarr';
}

export const findOrCreateTorrent = async ({
  basename,
  ext,
  fullpath,
  source,
}: FindOrCreateTorrent) => {
  const metadata = {
    file: basename,
    path: fullpath,
    type: ext === '.torrent' ? 'torrent' : 'magnet',
    status: computeTorrentStatus(source),
  };

  log('Searching for %o in database', basename);

  const existing = await findTorrentByPathname(fullpath);

  if (existing) {
    log('Found %o in database', basename);
    return existing;
  }

  return createTorrent(metadata)
    .then((torrent) => {
      log('Torrent created: %o', basename);
      return torrent;
    })
    .catch((error) => {
      log('Failed to create torrent: %o', basename);
      throw error;
    });
};
