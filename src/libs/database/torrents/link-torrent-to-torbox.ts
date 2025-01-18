import { MagnetDownload } from '../../torbox/create-magnet-download';
import { Torrent } from '../../types/torrent';
import { prisma } from '../index';
import { dbLogger } from '../logger';

const log = dbLogger.extend('link-torrent-to-torbox');

export const linkTorrentToTorbox = async (
  torrent: Torrent,
  download: MagnetDownload
) => {
  log(
    'Linking torrent %o to torbox %o',
    torrent.torrent_id,
    download.data.torrent_id
  );

  return prisma.torrents
    .update({
      where: { torrent_id: torrent.torrent_id },
      data: {
        torbox_id: download.data.torrent_id,
        torbox_hash: download.data.hash,
        torbox_auth_id: download.data.auth_id,
      },
    })
    .then((torrent) => {
      log('Linked %o to torbox %o', torrent.file, download.data.torrent_id);
      return torrent;
    })
    .catch((error) => {
      log(
        'Failed to link %o to torbox %o: %o',
        torrent.file,
        download.data.torrent_id,
        error.message
      );
      throw error;
    });
};
