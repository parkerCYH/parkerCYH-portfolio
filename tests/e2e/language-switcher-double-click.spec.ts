import { test, expect } from '@playwright/test';

test.describe('LanguageSwitcher 雙擊不觸發文字選取', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/zh-TW');
    });

    test('雙擊 trigger 不應選取任何文字', async ({ page }) => {
        const trigger = page.getByRole('button', { name: /switch language/i });

        await trigger.dblclick();

        const selectedText = await page.evaluate(() => window.getSelection()?.toString() ?? '');
        expect(selectedText).toBe('');
    });

    test('快速連點兩下再點兩下也不應有選取文字', async ({ page }) => {
        const trigger = page.getByRole('button', { name: /switch language/i });

        // 第一次 dblclick
        await trigger.dblclick();
        // 等 dropdown 動畫完成後關閉
        await page.keyboard.press('Escape');
        // 第二次 dblclick
        await trigger.dblclick();

        const selectedText = await page.evaluate(() => window.getSelection()?.toString() ?? '');
        expect(selectedText).toBe('');
    });
});
