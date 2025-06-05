import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'tests',
  use: {
    baseURL: 'https://example-ecommerce.com',
    headless: true,
  },
};

export default config;
