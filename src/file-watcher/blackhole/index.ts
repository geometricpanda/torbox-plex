import chokidar from 'chokidar';

import { ingestTorrentFile } from '@/libs/actions/ingest-torrent-file';
import { daemonConfig } from '@/libs/config';

import { dLogger } from '../../logger';

export const logger = dLogger.extend('blackhole');

const { torrentBlackhole } = daemonConfig;

export const onAdd = (filename: string) => {
  logger('Add: %o', filename);
  return ingestTorrentFile(filename);
};

if (torrentBlackhole.enabled) {
  const watcher = chokidar.watch(torrentBlackhole.path, {
    persistent: true,
    ignoreInitial: !torrentBlackhole.scanAtStartup,
  });

  watcher.on('add', onAdd);
  logger('Watching %s', torrentBlackhole.path);
}
