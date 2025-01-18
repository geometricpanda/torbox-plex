import path from 'node:path';

import { daemonConfig } from '../config';

const { torboxPlex } = daemonConfig;

export const filterVideoFile = (file: string) => {
  const ext = path.extname(file).slice(1);
  return torboxPlex.videoFileTypes.includes(ext);
};

export const filterVideoFilename = (file: string) => {
  const ext = path.extname(file);
  const filename = path.basename(file, ext);
  const containsIgnored = torboxPlex.videoFileIgnores.some(
    (type) => filename === type
  );

  return !containsIgnored;
};
