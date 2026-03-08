import { test, expect } from '@playwright/test';

test.describe('Smoke Tests（英文版）', () => {
    test('根路徑自動 redirect 至語系前綴', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveURL(/\/(zh-TW|en|ja)/);
    });

    test('首頁核心內容可見', async ({ page }) => {
        await page.goto('/en');
        await expect(page.getByText("Hi, I'm")).toBeVisible();
    });

    test('關於頁可載入', async ({ page }) => {
        await page.goto('/en/about');
        await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
    });

    test('作品頁可載入', async ({ page }) => {
        await page.goto('/en/projects');
        await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
    });

    test('聯絡頁可載入', async ({ page }) => {
        await page.goto('/en/contact');
        await expect(page.getByText('Contact Me')).toBeVisible();
    });

    test('首頁 Footer 版權文字可見', async ({ page }) => {
        await page.goto('/en');
        await expect(page.getByText('© 2025')).toBeVisible();
    });

    test('導航：點 About 連結跳至 /en/about', async ({ page }) => {
        await page.goto('/en');
        await page.getByRole('link', { name: 'About' }).click();
        await expect(page).toHaveURL(/\/en\/about/);
    });

    test('導航：點 Contact 連結跳至 /en/contact', async ({ page }) => {
        await page.goto('/en');
        await page.getByRole('link', { name: 'Contact', exact: true }).first().click();
        await expect(page).toHaveURL(/\/en\/contact/);
    });
});
