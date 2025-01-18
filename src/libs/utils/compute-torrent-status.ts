export const computeTorrentStatus = (
  source: 'torrent-blackhole' | 'radarr'
) => {
  if (source === 'torrent-blackhole') {
    return 'pending';
  }

  if (source === 'radarr') {
    return 'initial';
  }

  throw new Error('Invalid source');
};
