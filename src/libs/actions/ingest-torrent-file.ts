import path from 'node:path';

import { deleteTorrent } from '../database/torrents/delete-torrent';
import { findOrCreateTorrent } from '../database/torrents/find-or-create-torrent';
import { logger } from '../logging';
import { addTorrentToTorbox } from './add-torrent-to-torbox';
import { healOrphan } from './heal-orphan';
import { syncTorrentContents } from './sync-torrent-contents';

const log = logger.extend('ingest-torrent-file');

export const ingestTorrentFile = async (filename: string) => {
  const basename = path.basename(filename);
  const ext = path.extname(filename);
  const fullPath = path.resolve(filename);

  log('New file: %o', basename);

  if (ext !== '.torrent' && ext !== '.magnet') {
    log('Skipping %o, not a torrent or magnet', basename);
    return;
  }

  log('Searching for torrent in database');

  const torrent = await findOrCreateTorrent({
    basename,
    ext,
    fullpath: fullPath,
    source: 'torrent-blackhole',
  });

  if (!torrent) {
    log('Failed to create torrent %o', basename);
    return;
  }

  if (!torrent.grab_id) {
    log('Linking torrent %o to Grab', basename);

    const orphan = await healOrphan(torrent);

    if (orphan) {
      log('Downloading from Torbox');
      await addTorrentToTorbox(orphan);
    }
  }
};
