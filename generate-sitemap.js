const { createWriteStream } = require('fs');
const { SitemapStream } = require('sitemap');

// Creates a sitemap object given the input configuration with URLs
const sitemap = new SitemapStream({ hostname: 'https://geyser.fund' });

const writeStream = createWriteStream('./public/sitemap.xml');
sitemap.pipe(writeStream);

sitemap.write({ url: '/', changefreq: 'daily'});
sitemap.write({ url: '/grants', changefreq: 'daily'});
sitemap.write({ url: '/about', changefreq: 'daily'});
sitemap.write({ url: '/terms-and-conditions', changefreq: 'daily'});
sitemap.write({ url: '/privacy-policy', changefreq: 'daily'});
sitemap.end();