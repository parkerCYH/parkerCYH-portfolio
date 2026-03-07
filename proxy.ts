import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // 排除 API 路由、靜態資源、_next 內部路徑
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
