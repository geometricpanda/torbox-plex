import config from 'config';

export interface BlackholeConfig {
  path: string;
  scanAtStartup: boolean;
  enabled: boolean;
}

export interface TorboxPlexConfig {
  videoFileTypes: string[];
  videoFileIgnores: string[];
}

export interface HousekeepingConfigProperty {
  runAtStartup: boolean; // whether the housekeeping task should run at startup (ignores enabled state);
  enabled: boolean; // whether the housekeeping task is enabled
  interval: number; // in milliseconds
}

export interface HousekeepingConfig {
  healOrphans: HousekeepingConfigProperty;
  syncTorrentContents: HousekeepingConfigProperty;
}

export interface DaemonConfig {
  torrentBlackhole: BlackholeConfig;
  scheduledJobs: HousekeepingConfig;
  torboxPlex: TorboxPlexConfig;
}

export const daemonConfig: DaemonConfig = {
  torrentBlackhole: config.get('torrentBlackhole'),
  scheduledJobs: config.get('scheduledJobs'),
  torboxPlex: config.get('torboxPlex'),
};
