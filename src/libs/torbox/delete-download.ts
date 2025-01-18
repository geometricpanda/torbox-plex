import { Torrent } from '../types/torrent';
import { TORBOX_API_BASE, TorboxHeaders } from './index';
import { tbLogger } from './logging';

const log = tbLogger.extend('create-magnet-download');

export interface DeleteDownloadError {
  success: false;
  error: null;
  detail: Array<{
    type: string;
    loc: Array<unknown>;
    msg: string;
  }>;
  data: null;
}

export interface DeleteDownload {
  success: true;
  error: null;
  detail: 'Torrent operation processed successfully.';
  data: null;
}

export const deleteDownload = async (torrent: Torrent) => {
  const url = new URL('/v1/api/torrents/controltorrent', TORBOX_API_BASE);
  log('Deleting torrent %o', torrent.file);

  const headers = new Headers(TorboxHeaders);
  headers.set('Content-Type', 'application/json');

  const body = {
    torrent_id: torrent.torbox_id,
    operation: 'delete',
  };

  const request = await fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (request.ok) {
    const data = (await request.json()) as DeleteDownload;
    log('Torrent %o deleted', torrent.file);
    return data;
  }

  const data = (await request.json()) as DeleteDownloadError;
  log('Failed to delete torrent %o, error: %o', torrent.file, data);
  return data;
};
