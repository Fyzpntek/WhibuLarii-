import { SITE, fetchHTML, parseHTML } from './_helpers.js';

export default async function handler(req, res) {
  try {
    const url = SITE + '/';
    const html = await fetchHTML(url);
    const $ = parseHTML(html);

    const results = [];

    // KHUSUS otakudesu.best
    $('.venz li, .animepost, .animposx').each((i, el) => {
      const link = $(el).find('a').attr('href');
      const title = $(el).find('h2').text().trim();
      const image = $(el).find('img').attr('src');
      const chapter = $(el).find('span').first().text().trim();

      if (title && link) {
        results.push({ title, link, image, chapter });
      }
    });

    res.status(200).json({ success: true, data: results });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}
