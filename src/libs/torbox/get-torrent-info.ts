import { Torrent } from '../types/torrent';
import { TORBOX_API_BASE, TorboxHeaders } from './index';

export interface TorrentInfo {
  success: boolean;
  error: null;
  detail: string;
  data: {
    name: string;
    hash: string;
    size: number;
    files: Array<{
      name: string;
      size: number;
    }>;
  };
}

export const getTorrentInfo = async (
  torrent: Torrent
): Promise<TorrentInfo> => {
  const url = new URL('/v1/api/torrents/torrentinfo', TORBOX_API_BASE);

  url.searchParams.set('hash', torrent.torbox_hash);
  url.searchParams.set('timeout', '10');

  const request = await fetch(url, {
    headers: TorboxHeaders,
    method: 'GET',
  });

  return request.json() as Promise<TorrentInfo>;
};
