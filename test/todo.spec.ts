import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL!);
  await page.evaluate(() => localStorage.clear());
});

test('adds a task and persists it', async ({ page }) => {
  await page.getByTestId('new-todo').fill('Buy eggs');
  await page.getByTestId('add-todo').click();            // <— use the add button
  await expect(page.getByText('Buy eggs')).toBeVisible();

  await page.reload();
  await expect(page.getByText('Buy eggs')).toBeVisible();
});