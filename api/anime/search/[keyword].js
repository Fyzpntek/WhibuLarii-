
import { SITE, fetchHTML, parseHTML } from '../_helpers.js';

export default async function handler(req, res) {
  try {
    const { keyword } = req.query;

    const url = SITE + '/?s=' + keyword;
    const html = await fetchHTML(url);
    const $ = parseHTML(html);

    const results = [];
    $('.post, .bs').each((i, el) => {
      const title = $(el).find('h2 a, .tt a').first().text().trim();
      const link = $(el).find('h2 a, .tt a').first().attr('href');
      const image = $(el).find('img').first().attr('src');
      results.push({ title, link, image });
    });

    res.status(200).json({ success: true, data: results });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Search failed', error: err.message });
  }
}
