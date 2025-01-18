import fs from 'node:fs/promises';

import { linkTorrentToTorbox } from '../database/torrents/link-torrent-to-torbox';
import { deleteTorrentFromDisk } from '../files/delete-torrent-from-disk';
import { createMagnetDownload } from '../torbox/create-magnet-download';
import { tbLogger } from '../torbox/logging';
import { Torrent } from '../types/torrent';
import { syncTorrentContents } from './sync-torrent-contents';

const log = tbLogger.extend('add-torrent-to-torbox');

export const addTorrentToTorbox = async (torrent: Torrent) => {
  if (torrent.type === 'magnet') {
    const magnet = await fs.readFile(torrent.path, 'utf8');
    const resp = await createMagnetDownload(magnet);

    if (resp.success) {
      log('Magnet created in Torbox for %o', torrent.file);
      const linkedTorrent = await linkTorrentToTorbox(torrent, resp);
      log('Removing Magnet file %o', torrent.file);
      await deleteTorrentFromDisk(torrent);
      await syncTorrentContents(linkedTorrent);
    }

    log(
      'Failed to create magnet in Torbox for %o, error: %o',
      torrent.file,
      resp.error
    );
  }
};
