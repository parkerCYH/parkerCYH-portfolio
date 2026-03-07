import { test, expect } from '@playwright/test';

test.describe('Header 語言切換器', () => {
    test('預設語言為繁中：redirect 到 /zh-TW 並顯示繁中內容', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveURL(/\/zh-TW/);
        await expect(page.getByText('嗨，我是')).toBeVisible();
    });

    test('切換至英文：URL 變 /en 並顯示英文內容', async ({ page }) => {
        await page.goto('/zh-TW');

        await page.getByRole('button', { name: /switch language/i }).click();
        await page.getByRole('menuitem', { name: 'EN' }).click();

        await expect(page).toHaveURL(/\/en/);
        await page.waitForLoadState('networkidle');
        await expect(page.getByText("Hi, I'm")).toBeVisible();
    });

    test('切換至日文：URL 變 /ja 並顯示日文內容', async ({ page }) => {
        await page.goto('/zh-TW');

        await page.getByRole('button', { name: /switch language/i }).click();
        await page.getByRole('menuitem', { name: '日本語' }).click();

        await expect(page).toHaveURL(/\/ja/);
        await page.waitForLoadState('networkidle');
        await expect(page.getByText('こんにちは、私は')).toBeVisible();
    });

    test('切換至英文後 <html lang> 屬性為 en', async ({ page }) => {
        await page.goto('/zh-TW');

        await page.getByRole('button', { name: /switch language/i }).click();
        await page.getByRole('menuitem', { name: 'EN' }).click();

        await expect(page).toHaveURL(/\/en/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });

    test('直接造訪 /ja 顯示日文內容（不需切換）', async ({ page }) => {
        await page.goto('/ja');
        await expect(page.getByText('こんにちは、私は')).toBeVisible();
    });

    test('在 /zh-TW/about 切換語言後路徑保留為 /en/about', async ({ page }) => {
        await page.goto('/zh-TW/about');

        await page.getByRole('button', { name: /switch language/i }).click();
        await page.getByRole('menuitem', { name: 'EN' }).click();

        await expect(page).toHaveURL(/\/en\/about/);
    });
});
