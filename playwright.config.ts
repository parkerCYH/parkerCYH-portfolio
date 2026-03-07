import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: false,

    use: {
        baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
        locale: 'zh-TW',
        trace: 'on-first-retry',
    },

    webServer: {
        command: 'pnpm dev',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 120_000,
    },

    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
