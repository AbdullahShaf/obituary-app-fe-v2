/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.osmrtnica.com', // canonical www domain
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,

  // Fetch dynamic routes
  additionalPaths: async (config) => {
    const result = [];

    try {
      // Fetch slugs from backend API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${apiUrl}/sitemap/slugs`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        timeout: 10000 // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP error! response: ${response}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON response, got ${contentType}`);
      }

      const data = await response.json();

      if (data.data) {
        // Add obituary pages /m/[slugKey]
        if (data.data.mSlugs && Array.isArray(data.data.mSlugs)) {
          data.data.mSlugs.forEach(slug => {
            if (slug) {
              result.push({
                loc: `/m/${slug}`,
                changefreq: 'weekly',
                priority: 0.8,
                lastmod: new Date().toISOString(),
              });
            }
          });
        }

        // Add florist company pages /cv/[slug]
        if (data.data.cvSlugs && Array.isArray(data.data.cvSlugs)) {
          data.data.cvSlugs.forEach(slug => {
            if (slug) {
              result.push({
                loc: `/cv/${slug}`,
                changefreq: 'monthly',
                priority: 0.7,
                lastmod: new Date().toISOString(),
              });
            }
          });
        }

        // Add funeral company pages /pp/[slug]
        if (data.data.ppSlugs && Array.isArray(data.data.ppSlugs)) {
          data.data.ppSlugs.forEach(slug => {
            if (slug) {
              result.push({
                loc: `/pp/${slug}`,
                changefreq: 'monthly',
                priority: 0.7,
                lastmod: new Date().toISOString(),
              });
            }
          });
        }
      }

      console.log(`[next-sitemap] Successfully fetched ${result.length} dynamic routes`);
    } catch (error) {
      console.error('[next-sitemap] Error fetching dynamic routes for sitemap:', error.message);
      console.log('[next-sitemap] Continuing with static pages only. Ensure backend is running for dynamic routes.');
    }

    return result;
  },

  // Control exactly which paths appear in sitemap
  transform: async (config, path) => {
    // Static SEO pages
    const allowedPaths = [
      '/',
      '/osmrtnice',
      '/pogrebi',
      '/cvetlicarne',
      '/pogrebna-p',
      '/primerjava',
      '/qr-kode',
      '/spominska',
      '/zalna-stran',
      '/podjetja',
    ];

    // Include static pages
    if (allowedPaths.includes(path)) {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: new Date().toISOString(),
      };
    }

    return null;
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: [
          '/admin/',
          '/c/',
          '/p/',
          '/u/',
          '/user/',
          '/api/',
          '/osmrtnice-vpis',
          '/registracija',
          '/kontakt',
          '/demo-memory-page',
          '/modal-check',
          '/change-company-slug',
        ],
        allow: '/',
      },
    ],
    additionalSitemaps: [
    ],
  },
};
