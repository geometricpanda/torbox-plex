import { TORBOX_API_KEY } from '../../torbox';

export const RADARR_API_BASE = 'http://192.168.1.49:7878/';
export const RADARR_API_KEY = 'c3d8c1e7a0894ee38117edd2fd49b4c5';

export const RadarrHeaders = new Headers();
RadarrHeaders.append('Content-Type', 'application/json');
RadarrHeaders.append('X-Api-Key', RADARR_API_KEY);
