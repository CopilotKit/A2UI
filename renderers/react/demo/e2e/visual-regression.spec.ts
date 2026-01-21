import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for A2UI React components.
 *
 * These tests capture screenshots of the demo gallery and compare them
 * against baseline images to detect visual regressions.
 *
 * To update baselines after intentional changes:
 *   npx playwright test --update-snapshots
 */

test.describe('A2UI React Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo page
    await page.goto('/');

    // Wait for the demo to fully load (wait for loading state to disappear)
    await page.waitForSelector('.demo-container', { state: 'visible' });

    // Wait for all A2UI surfaces to render
    await page.waitForSelector('[data-surface-id]', { state: 'visible' });

    // Small delay to ensure all styles are applied
    await page.waitForTimeout(500);
  });

  test('full page screenshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('full-page.png', {
      fullPage: true,
    });
  });

  test('text components section', async ({ page }) => {
    const section = page.locator('.demo-section').filter({ hasText: 'Text Components' });
    // Markdown rendering may take time to stabilize
    await expect(section).toHaveScreenshot('text-components.png', { timeout: 15000 });
  });

  test('buttons section', async ({ page }) => {
    const section = page.locator('.demo-section').filter({ hasText: 'Buttons' });
    await expect(section).toHaveScreenshot('buttons.png');
  });

  test('icons section', async ({ page }) => {
    // Use more specific selector to avoid matching "Layout Components" section that contains "Icons" text
    const section = page.locator('.demo-section').filter({ hasText: 'Icons (Material Symbols)' });
    await expect(section).toHaveScreenshot('icons.png');
  });

  test('image section', async ({ page }) => {
    const section = page.locator('.demo-section').filter({ has: page.locator('.demo-title', { hasText: 'Image' }) });
    // Increase timeout for image loading
    await expect(section).toHaveScreenshot('image.png', { timeout: 15000 });
  });

  test('form elements section', async ({ page }) => {
    const section = page.locator('.demo-section').filter({ hasText: 'Form Elements' });
    await expect(section).toHaveScreenshot('form-elements.png');
  });

  test('layout components section', async ({ page }) => {
    const section = page.locator('.demo-section').filter({ hasText: 'Layout Components' });
    await expect(section).toHaveScreenshot('layout-components.png');
  });

  test('card section', async ({ page }) => {
    const section = page.locator('.demo-section').filter({ hasText: 'Card' });
    await expect(section).toHaveScreenshot('card.png');
  });

  test('dividers section', async ({ page }) => {
    const section = page.locator('.demo-section').filter({ hasText: 'Dividers' });
    await expect(section).toHaveScreenshot('dividers.png');
  });
});

test.describe('A2UI Individual Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.demo-container', { state: 'visible' });
    await page.waitForSelector('[data-surface-id]', { state: 'visible' });
    await page.waitForTimeout(500);
  });

  test('button primary', async ({ page }) => {
    const item = page.locator('.demo-item').filter({ hasText: 'Primary Button' });
    const surface = item.locator('[data-surface-id]');
    await expect(surface).toHaveScreenshot('button-primary.png');
  });

  test('button secondary', async ({ page }) => {
    const item = page.locator('.demo-item').filter({ hasText: 'Secondary Button' });
    const surface = item.locator('[data-surface-id]');
    await expect(surface).toHaveScreenshot('button-secondary.png');
  });

  test('text field', async ({ page }) => {
    const item = page.locator('.demo-item').filter({ hasText: 'Text Field' }).first();
    const surface = item.locator('[data-surface-id]');
    await expect(surface).toHaveScreenshot('text-field.png');
  });

  test('checkbox unchecked', async ({ page }) => {
    const item = page.locator('.demo-item').filter({ hasText: 'Checkbox (Unchecked)' });
    const surface = item.locator('[data-surface-id]');
    await expect(surface).toHaveScreenshot('checkbox-unchecked.png');
  });

  test('checkbox checked', async ({ page }) => {
    const item = page.locator('.demo-item').filter({ hasText: 'Checkbox (Checked)' });
    const surface = item.locator('[data-surface-id]');
    await expect(surface).toHaveScreenshot('checkbox-checked.png');
  });

  test('slider', async ({ page }) => {
    const item = page.locator('.demo-item').filter({ hasText: 'Slider' });
    const surface = item.locator('[data-surface-id]');
    await expect(surface).toHaveScreenshot('slider.png');
  });

  test('heading h1', async ({ page }) => {
    const item = page.locator('.demo-item').filter({ hasText: 'Heading 1' });
    const surface = item.locator('[data-surface-id]');
    await expect(surface).toHaveScreenshot('heading-h1.png');
  });

  test('heading h2', async ({ page }) => {
    const item = page.locator('.demo-item').filter({ hasText: 'Heading 2' });
    const surface = item.locator('[data-surface-id]');
    await expect(surface).toHaveScreenshot('heading-h2.png');
  });

  test('caption', async ({ page }) => {
    const item = page.locator('.demo-item').filter({ hasText: 'Caption' });
    const surface = item.locator('[data-surface-id]');
    await expect(surface).toHaveScreenshot('caption.png');
  });

  test('card with content', async ({ page }) => {
    const item = page.locator('.demo-item').filter({ hasText: 'Card with Content' });
    const surface = item.locator('[data-surface-id]');
    await expect(surface).toHaveScreenshot('card-with-content.png');
  });
});
