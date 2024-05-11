// playwright.config.js using ES Module syntax
import { devices } from 'playwright/test';

export default {
  testDir: './tests',
  testMatch: '**/*.test.js',
  use: {
    browserName: 'chromium',
    viewport: { width: 1280, height: 720 },
    headless: true,
  },
  projects: [
    {
      name: 'Desktop Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};
