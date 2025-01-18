import { add } from 'date-fns';
import { addHours } from 'date-fns/addHours';

import { createTorrentFiles } from '../database/torrent-files/create-torrent-files';
import { logger } from '../logging';
import { getTorrentInfo } from '../torbox/get-torrent-info';
import { Torrent } from '../types/torrent';
import { filterVideoFile, filterVideoFilename } from '../utils/filter-videos';
import { requestNewTorrent } from './request-new-torrent';
import { torrentContentsFailed } from './torrent-contents-failed';

const log = logger.extend('sync-torrent-contents');

export const syncTorrentContents = async (torrent: Torrent) => {
  if (torrent.torrent_info_errors > 0) {
    const lastError = new Date(torrent.torrent_info_last_error);
    const allowedFrom = addHours(lastError, 1);
    if (Date.now() < allowedFrom.getTime()) {
      log('Skipping %o, last errored less than 1h ago', torrent.file);
      return;
    }
  }

  const torrentInfo = await getTorrentInfo(torrent);

  if (!torrentInfo.success) {
    log(
      'Failed to get torrent info for %o, error: %o',
      torrent.file,
      torrentInfo.error
    );
    await torrentContentsFailed(torrent);
    return;
  }

  const videoFiles = torrentInfo.data.files
    .map((file) => file.name)
    .filter(filterVideoFile)
    .filter(filterVideoFilename);

  if (!videoFiles.length) {
    log('No video files found in %o', torrent.file);
    await requestNewTorrent(torrent);
  }

  log('Found %o allowed files within %o', videoFiles.length, torrent.file);

  await createTorrentFiles(torrent, videoFiles);
  return;
};
