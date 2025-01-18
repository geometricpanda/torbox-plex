import { incrementTorrentInfoErrors } from '../database/torrents/increment-torrent-info-errors';
import { logger } from '../logging';
import { Torrent } from '../types/torrent';
import { requestNewTorrent } from './request-new-torrent';

const log = logger.extend('torrent-contents-failed');

export const torrentContentsFailed = async (torrent: Torrent) => {
  if (torrent.torrent_info_errors >= 3) {
    log('Failed to get torrent info for %o, deleting', torrent.file);
    await requestNewTorrent(torrent);
    return;
  }

  log('Failed to get torrent info for %o, incrementing errors', torrent.file);
  await incrementTorrentInfoErrors(torrent);
};
