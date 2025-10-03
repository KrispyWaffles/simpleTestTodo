import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  use: { baseURL: 'http://127.0.0.1:5500/', trace: 'on-first-retry' }, // <-- change port if different
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
  ],
  webServer: {
    command: 'npm run dev',      // or: npm run start / npm run preview
    url: 'http://127.0.0.1:5500/',// <-- same as baseURL
    reuseExistingServer: true,
    timeout: 60000
  }
});