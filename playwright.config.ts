import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  timeout: 60000,

  workers: 1,

  retries: 0,

  use: {

    baseURL: 'http://localhost:4200',

    headless: false,

    viewport: null,

    launchOptions: {
      args: ['--start-maximized']
    },

    actionTimeout: 15000,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure'   // ⭐ very useful for debugging

  },

  reporter: [
    ['list'],
    ['html']
  ],

  projects: [

    // 🔐 Login Setup Project
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // 🧪 Main Tests
    {
      name: 'chromium',

      use: {
        storageState: 'storageState.json'
      },

      dependencies: ['setup'],

    }

  ]

});