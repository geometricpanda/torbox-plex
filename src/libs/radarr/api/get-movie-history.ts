import { RadarrHistory } from '../../types/radarr.interface';
import { Grab } from '../../types/torrent';
import { RADARR_API_BASE, RadarrHeaders } from './index';
import { rapiLogger } from './logging';

const log = rapiLogger.extend('get-radarr-movie-history');

export type RadarrHistories = Array<RadarrHistory>;

export const getRadarrMovieHistory = async (movieId: number) => {
  const url = new URL(`/api/v3/history/movie`, RADARR_API_BASE);
  url.searchParams.append('movieId', movieId.toString());

  return fetch(url.toString(), { headers: RadarrHeaders })
    .then((res) => {
      if (res.ok) {
        return res.json() as Promise<RadarrHistories>;
      }
      throw new Error(res.statusText);
    })
    .then((data) => {
      log('Found %o histories for %o', data.length, movieId);
      return data;
    })
    .catch((err) => {
      log('Could not get movie history for %o, error: %o', movieId, err);
      throw err;
    });
};
