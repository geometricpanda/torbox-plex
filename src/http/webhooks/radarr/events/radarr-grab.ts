import { createGrab } from '@/libs/database/grabs/create-grab';
import { findGrab } from '@/libs/database/grabs/find-grab';

import { WebhookError } from '../../error';
import { RadarrGrabEvent } from '../schema';

export const radarrGrab = async (data: RadarrGrabEvent) => {
  const existing = await findGrab({
    folder_path: data.movie.folderPath,
    release_title: data.release.releaseTitle,
  });

  if (existing) {
    throw new WebhookError(422, 'Grab already exists');
  }

  await createGrab({
    title: data.movie.title,
    folder_path: data.movie.folderPath,
    release_title: data.release.releaseTitle,
    arr: 'radarr',
    arr_id: data.movie.id,
  });

  return {
    success: true,
    detail: {
      message: 'Grab created',
    },
  };
};
