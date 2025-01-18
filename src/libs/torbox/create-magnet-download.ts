import { TORBOX_API_BASE, TorboxHeaders } from './index';
import { tbLogger } from './logging';

const log = tbLogger.extend('create-magnet-download');

export enum MagnetDownloadStatus {
  DOWNLOADING = 'Torrent Added Successfully',
  QUEUED = 'Torrent Queued Successfully',
  CACHED = 'Found Cached Torrent. Using Cached Torrent.',
}

export interface MagnetDownloadError {
  success: false;
  error: string;
  detail: string;
}

export interface MagnetDownload {
  success: boolean;
  error: null;
  detail: string;
  data: {
    hash: string;
    torrent_id: number;
    auth_id: string;
  };
}

export type MagnetDownloadResponse = MagnetDownload | MagnetDownloadError;

export type CreateMagnetDownload = (
  magnet: string
) => Promise<MagnetDownloadResponse>;

export const createMagnetDownload: CreateMagnetDownload = async (magnet) => {
  const formdata = new FormData();
  formdata.set('magnet', magnet);

  const url = new URL('/v1/api/torrents/createtorrent', TORBOX_API_BASE);
  log('Creating Magnet %o', magnet);

  const request = await fetch(url, {
    headers: TorboxHeaders,
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  });

  const response = (await request.json()) as MagnetDownloadResponse;

  if (response.success) {
    log(
      'Magnet Created with ID: %o, Hash: %o',
      response.data.torrent_id,
      response.data.hash
    );

    return response;
  }

  log('Failed to create Magnet: %o', response.error);

  return response;
};
