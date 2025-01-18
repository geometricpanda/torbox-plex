import { Grab, Torrent } from '../../types/torrent';
import { prisma } from '../index';
import { dbLogger } from '../logger';

const log = dbLogger.extend('link-torrent-to-grab');

export const linkTorrentToGrab = async (torrent: Torrent, grab: Grab) =>
  prisma.torrents
    .update({
      include: { grab: true },
      where: { torrent_id: torrent.torrent_id },
      data: { grab_id: grab.grab_id },
    })
    .then((torrent) => {
      log('Linked %o to %o', grab.title, torrent.file);
      return torrent;
    })
    .catch((error) => {
      log(
        'Failed to link %o to %o: %o',
        grab.title,
        torrent.file,
        error.message
      );
      throw error;
    });
