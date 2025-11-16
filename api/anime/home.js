/**
 * Vercel serverless API for Otakudesu (simple scraper)
 * Default target site is read from environment variable OT_SITE. 
 * If not set, default is 'https://otakudesu.id' (you can change in Vercel env).
 *
 * Note: Selectors are generic and may require adjustments depending on site structure.
 * Each function uses a tiny in-memory cache to reduce repeated scraping.
 */


import { SITE, fetchHTML, parseHTML } from './_helpers.js';

export default async function handler(req, res) {
  try {
    const url = SITE + '/';
    const html = await fetchHTML(url);
    const $ = parseHTML(html);
    const results = [];
    // Generic selector - adjust if necessary
    $('.post, .bs, .post-inner').each((i, el) => {
      const title = $(el).find('h2 a, .tt a, .judul a').first().text().trim();
      const link = $(el).find('h2 a, .tt a, .judul a').first().attr('href');
      const image = $(el).find('img').first().attr('src') || $(el).find('img').first().attr('data-src');
      const chapter = $(el).find('.eps, .epxs, .chapter, .meta').first().text().trim();
      results.push({ title, link, image, chapter });
    });
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch home', error: err.message });
  }
}
