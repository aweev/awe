// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'de', 'fr'],
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Optional: customize the locale detection
  localeDetection: true
});

export const config = {
  // Match only internationalized pathnames, exclude protected routes
  matcher: [
    // Match the root
    '/',
    // Match all paths with supported locales, but exclude protected routes
    '/(de|fr|en)/:path*',
    // Exclude API routes, static files, member routes, admin routes, and file extensions
     '/((?!api|_next|_vercel|members|admin|manifest.json|favicon.ico)(?!.*\\.).*)',
  ]
};