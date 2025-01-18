import { findGrabById } from '../database/grabs/find-grab-by-id';
import { logger } from '../logging';
import { getRadarrMovieHistory } from '../radarr/api/get-movie-history';
import { Torrent } from '../types/torrent';

const log = logger.extend('get-movie-history-from-torrent');
export const getMovieHistoryFromTorrent = async (torrent: Torrent) => {
  const grab = await findGrabById(torrent.grab_id);
  const histories = await getRadarrMovieHistory(grab.arr_id);
  const history = histories.filter(
    (history) => history.movieId === grab.arr_id
  );

  if (!history.length) {
    log('No history found for %o', grab.release_title);
    return;
  }

  return history[0];
};
