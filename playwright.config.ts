import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 500000,
  forbidOnly: !!process.env.CI,
  workers: 2,
  reporter: 'allure-playwright',

  use: {
    baseURL: 'https://stage.rentzila.com.ua/',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

});
