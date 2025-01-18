import { healOrphanedTorrents } from '@/libs/actions/heal-orphaned-torrents';
import { syncTorrentsContents } from '@/libs/actions/sync-torrents-contents';
import { daemonConfig } from '@/libs/config';

import { dLogger } from '../../logger';
import { initHousekeeping } from './utils';

const { scheduledJobs } = daemonConfig;

const cronLogger = dLogger.extend('scheduler');
const hoLog = cronLogger.extend('heal-orphaned-torrents');
const stcLog = cronLogger.extend('sync-torrent-contents');

export const healOrphanedTorrentsJob = async () => {
  hoLog('started');
  await healOrphanedTorrents();
  hoLog('complete');
};

export const syncTorrentContentsJob = async () => {
  stcLog('started');
  await syncTorrentsContents();
  stcLog('complete');
};

// TODO: add job to delete torrents that have been orphaned for too long
// TODO: add job to create symlinks for torrents that have been downloaded

initHousekeeping(scheduledJobs.healOrphans, healOrphanedTorrentsJob);
initHousekeeping(scheduledJobs.syncTorrentContents, syncTorrentContentsJob);
