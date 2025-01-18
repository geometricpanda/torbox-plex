import { findOrphanedTorrents } from '../database/torrents/find-orphaned-torrents';
import { logger } from '../logging';
import { addTorrentToTorbox } from './add-torrent-to-torbox';
import { healOrphan } from './heal-orphan';
import { syncTorrentContents } from './sync-torrent-contents';

const log = logger.extend('heal-orphaned-torrents');

export const healOrphanedTorrents = async () => {
  const orphanedTorrents = await findOrphanedTorrents();

  let x = 0;
  for (const orphan of orphanedTorrents) {
    x++;

    log(
      'Healing orphaned torrent %o/%o %o',
      x,
      orphanedTorrents.length,
      orphan.file
    );

    const linkedOrphan = await healOrphan(orphan);

    if (linkedOrphan) {
      log('Oprhan healed', linkedOrphan.file);
      await addTorrentToTorbox(linkedOrphan);
      await syncTorrentContents(orphan);
    }
  }
};
