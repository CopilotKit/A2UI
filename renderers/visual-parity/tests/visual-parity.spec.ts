import { test, expect } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

/**
 * Visual parity tests for A2UI React vs Lit renderers.
 *
 * These tests compare screenshots of the same component fixtures rendered by
 * both React and Lit to ensure visual consistency between the two renderers.
 *
 * Strategy:
 * - Lit is treated as the "reference" implementation
 * - React screenshots are compared DIRECTLY against Lit screenshots
 * - Tests fail if the pixel difference exceeds the threshold
 *
 * To update Lit baselines after intentional Lit changes:
 *   npx playwright test --update-snapshots
 */

const REACT_BASE_URL = 'http://localhost:5001';
const LIT_BASE_URL = 'http://localhost:5002';

// Strict threshold for visual parity
// 0.1 = 10% color difference tolerance per pixel
const PIXEL_DIFF_THRESHOLD = 0.1;

// Maximum allowed different pixels (as percentage of total)
const MAX_DIFF_PERCENT = 1; // 1% of pixels can differ

// All fixtures to test
const fixtures = [
  'textBasic',
  'textH1',
  'textH2',
  'textCaption',
  'buttonPrimary',
  'buttonSecondary',
  'icon',
  'card',
  'checkboxUnchecked',
  'checkboxChecked',
  'textField',
  'slider',
  'dividerHorizontal',
  'dividerVertical',
  'row',
  'column',
] as const;

/**
 * Compare two PNG buffers and return the number of different pixels.
 */
function compareImages(
  img1Buffer: Buffer,
  img2Buffer: Buffer
): { diffPixels: number; totalPixels: number; diffPercent: number } {
  const img1 = PNG.sync.read(img1Buffer);
  const img2 = PNG.sync.read(img2Buffer);

  // Images must be the same size for comparison
  if (img1.width !== img2.width || img1.height !== img2.height) {
    return {
      diffPixels: -1,
      totalPixels: img1.width * img1.height,
      diffPercent: 100, // Size mismatch = 100% different
    };
  }

  const totalPixels = img1.width * img1.height;
  const diffPixels = pixelmatch(
    img1.data,
    img2.data,
    null, // Don't generate diff image
    img1.width,
    img1.height,
    { threshold: PIXEL_DIFF_THRESHOLD }
  );

  return {
    diffPixels,
    totalPixels,
    diffPercent: (diffPixels / totalPixels) * 100,
  };
}

test.describe('Visual Parity: React vs Lit (Direct Comparison)', () => {
  for (const fixture of fixtures) {
    test(`${fixture} - React matches Lit`, async ({ page }) => {
      // Screenshot Lit (reference)
      await page.goto(`${LIT_BASE_URL}?fixture=${fixture}`);
      await page.waitForSelector('.fixture-container', { state: 'visible' });
      await page.waitForTimeout(500);
      const litContainer = page.locator('.fixture-container');
      const litScreenshot = await litContainer.screenshot();

      // Screenshot React (test subject)
      await page.goto(`${REACT_BASE_URL}?fixture=${fixture}`);
      await page.waitForSelector('.fixture-container', { state: 'visible' });
      await page.waitForTimeout(500);
      const reactContainer = page.locator('.fixture-container');
      const reactScreenshot = await reactContainer.screenshot();

      // Direct comparison: React vs Lit
      const { diffPixels, totalPixels, diffPercent } = compareImages(
        reactScreenshot,
        litScreenshot
      );

      // Report the difference
      console.log(
        `${fixture}: ${diffPixels}/${totalPixels} pixels differ (${diffPercent.toFixed(2)}%)`
      );

      // Fail if difference exceeds threshold
      expect(
        diffPercent,
        `React and Lit differ by ${diffPercent.toFixed(2)}% (${diffPixels} pixels). ` +
          `Max allowed: ${MAX_DIFF_PERCENT}%`
      ).toBeLessThanOrEqual(MAX_DIFF_PERCENT);
    });
  }
});

test.describe('Lit Baseline Screenshots', () => {
  // These capture Lit baselines for reference
  // Use --update-snapshots to regenerate after intentional Lit changes
  for (const fixture of fixtures) {
    test(`Lit baseline: ${fixture}`, async ({ page }) => {
      await page.goto(`${LIT_BASE_URL}?fixture=${fixture}`);
      await page.waitForSelector('.fixture-container', { state: 'visible' });
      await page.waitForTimeout(500);

      const container = page.locator('.fixture-container');
      await expect(container).toHaveScreenshot(`lit-${fixture}.png`, {
        maxDiffPixels: 0, // Lit baselines should be stable
      });
    });
  }
});

test.describe('React Screenshots (for debugging)', () => {
  // These capture React screenshots for visual inspection
  for (const fixture of fixtures) {
    test(`React: ${fixture}`, async ({ page }) => {
      await page.goto(`${REACT_BASE_URL}?fixture=${fixture}`);
      await page.waitForSelector('.fixture-container', { state: 'visible' });
      await page.waitForTimeout(500);

      const container = page.locator('.fixture-container');
      await expect(container).toHaveScreenshot(`react-${fixture}.png`, {
        maxDiffPixels: 50, // Allow small changes in React during development
      });
    });
  }
});
