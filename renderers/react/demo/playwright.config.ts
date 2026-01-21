import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for A2UI React visual regression tests.
 *
 * These tests capture screenshots of the demo gallery components
 * and compare them against baseline images to detect visual regressions.
 */
export default defineConfig({
  // Test directory
  testDir: './e2e',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI for consistent screenshots
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  // Shared settings for all projects
  use: {
    // Base URL for the dev server
    baseURL: 'http://localhost:4203',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot settings for visual comparison
    screenshot: 'only-on-failure',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Consistent viewport for screenshots
        viewport: { width: 1280, height: 720 },
      },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run dev -- --port 4203',
    url: 'http://localhost:4203',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  // Snapshot settings
  expect: {
    toHaveScreenshot: {
      // Allow small pixel differences for anti-aliasing
      maxDiffPixels: 100,
      // Threshold for pixel color difference (0-1)
      threshold: 0.2,
    },
  },
});
