/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://osmrtnica.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // exclude: ['/404', '/500'], // optional
  changefreq: 'daily',
  priority: 0.7,

  // Disable automatic inclusion
  // exclude: ['*'],

  // Only include selected pages manually
  transform: async(config, path)=>{
    const allowedPaths = [
      '/',
      '/cvetlicarne',                
      '/osmrtnice',
      '/pogrebna-p',
      '/registracija',
      '/primerjava',
      '/pogrebi',
      '/spominska',
      '/podjetja',
      '/osmrtnica',
      '/zalna-stran',
      '/qr-kode',
    ];

    // Only include allowed paths
    if (!allowedPaths.includes(path)) {
      return null; // exclude from sitemap
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  robotsTxtOptions: {
    additionalSitemaps: [
      'https://osmrtnica.com/sitemap-0.xml',
    ],
  },
};
