import { HousekeepingConfigProperty } from '@/libs/config';

export type HouseKeepingFn = (config: HousekeepingConfigProperty) => void;

export const initHousekeeping = (
  config: HousekeepingConfigProperty,
  hook: HouseKeepingFn
) => {
  if (!config.enabled) {
    return;
  }

  if (config.interval) {
    const interval = config.interval;
    setInterval(() => hook(config), interval);
  }

  if (config.runAtStartup) {
    hook(config);
  }
};
