import { SITE, fetchHTML, parseHTML } from './_helpers.js';

export default async function handler(req, res) {
  try {
    const url = SITE + '/';
    const html = await fetchHTML(url);
    const $ = parseHTML(html);
    const results = [];

    $('.post, .bs, .post-inner').each((i, el) => {
      const title = $(el).find('h2 a, .tt a, .judul a').first().text().trim();
      const link = $(el).find('h2 a, .tt a, .judul a').first().attr('href');
      const image = $(el).find('img').first().attr('src');
      const chapter = $(el).find('.eps, .epxs, .chapter, .meta').first().text().trim();
      results.push({ title, link, image, chapter });
    });

    res.status(200).json({ success: true, data: results });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed', error: err.message });
  }
}
