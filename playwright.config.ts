import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Location of your Playwright tests
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Prevent test.only() from accidentally being committed to CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,

  // Use one worker in CI for more stable execution
  workers: process.env.CI ? 1 : undefined,

  // Generate multiple test reports
  reporter: [
    // Playwright HTML report
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
      },
    ],

    // JUnit XML report for GitHub Actions
    [
      'junit',
      {
        outputFile: 'test-results/results.xml',
        includeProjectInTestName: true,
      },
    ],

    // GitHub Actions annotations
    ['github'],
  ],

  // Shared settings for all projects
  use: {
    // Collect trace when a test fails and is retried
    trace: 'on-first-retry',

    // Capture screenshot when a test fails
    screenshot: 'only-on-failure',

    // Record video when a test fails
    video: 'retain-on-failure',
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});