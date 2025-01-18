import { findFilelessTorrents } from '../database/torrents/find-fileless-torrents';
import { logger } from '../logging';
import { syncTorrentContents } from './sync-torrent-contents';

const log = logger.extend('sync-torrents-contents');

export const syncTorrentsContents = async () => {
  const filelessTorrents = await findFilelessTorrents();

  for (const torrent of filelessTorrents) {
    await syncTorrentContents(torrent);
  }
};
