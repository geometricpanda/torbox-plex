import fs from 'node:fs/promises';

import { Torrent } from '../types/torrent';
import { fiLogger } from './logger';

const log = fiLogger.extend('delete-torrent-from-disk');

export const deleteTorrentFromDisk = async (torrent: Torrent) =>
  fs
    .unlink(torrent.path)
    .then(() => log('Deleted torrent %o', torrent.file))
    .catch((err) =>
      log('Failed to delete torrent %o, error: %o', torrent.file, err)
    );
