import { deleteTorrent } from '../database/torrents/delete-torrent';
import { notifyRadarrFailedGrabHistory } from '../radarr/api/notify-failed-grab';
import { deleteDownload } from '../torbox/delete-download';
import { Torrent } from '../types/torrent';
import { getMovieHistoryFromTorrent } from './get-movie-history-from-torrent';

export const requestNewTorrent = async (torrent: Torrent) => {
  const history = await getMovieHistoryFromTorrent(torrent);
  await notifyRadarrFailedGrabHistory(history);
  await deleteTorrent(torrent);
  await deleteDownload(torrent);
  return;
};
