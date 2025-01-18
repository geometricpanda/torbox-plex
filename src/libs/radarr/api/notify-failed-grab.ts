import { RadarrHistory } from '../../types/radarr.interface';
import { RADARR_API_BASE, RadarrHeaders } from './index';
import { rapiLogger } from './logging';

const log = rapiLogger.extend('notify-failed-grab-history');

export const notifyRadarrFailedGrabHistory = async (history: RadarrHistory) => {
  const url = new URL(`/api/v3/history/failed/${history.id}`, RADARR_API_BASE);

  await fetch(url.toString(), {
    method: 'POST',
    headers: RadarrHeaders,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      log('Successfully notified Radarr of failed grab %o', history.id);
      console.log(data);
    })
    .catch((err) => {
      log(
        'Failed to notify Radarr of failed grab %o, error: %o',
        history.id,
        err
      );
      throw err;
    });
};
