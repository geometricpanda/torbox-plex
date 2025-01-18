import config from 'config';

export interface TorboxConfig {
  apiKey: string;
  apiUrl: string;
}

export const torboxConfig: TorboxConfig = config.get('torbox');

export const TORBOX_API_BASE = torboxConfig.apiUrl;
export const TORBOX_API_KEY = torboxConfig.apiKey;

export const TorboxHeaders = new Headers();
TorboxHeaders.append('authorization', `bearer ${TORBOX_API_KEY}`);
