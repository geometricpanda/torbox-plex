import path from 'node:path';

import { findGrabByPathname } from '../database/grabs/find-grab-by-pathname';
import { deleteTorrent } from '../database/torrents/delete-torrent';
import { linkTorrentToGrab } from '../database/torrents/link-torrent-to-grab';
import { deleteTorrentFromDisk } from '../files/delete-torrent-from-disk';
import { logger } from '../logging';
import type { Torrent } from '../types/torrent';

const log = logger.extend('heal-orphan');

export const healOrphan = async (torrent: Torrent) => {
  const ext = path.extname(torrent.file);
  const filename = path.basename(torrent.file, ext);

  const grab = await findGrabByPathname(filename);

  if (!grab) {
    log('Could not heal orphan: %o', torrent.file);
    await deleteTorrent(torrent);
    await deleteTorrentFromDisk(torrent);
    return;
  }

  log('Healed orphan %o', torrent.file);
  return linkTorrentToGrab(torrent, grab);
};
