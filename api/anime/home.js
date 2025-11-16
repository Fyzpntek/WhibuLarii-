import { SITE, fetchHTML, parseHTML } from './_helpers.js';

export default async function handler(req, res) {
  try {
    const url = SITE + '/';
    const html = await fetchHTML(url);
    const $ = parseHTML(html);

    const results = [];

    $('.venz ul li').each((i, el) => {
      const parent = $(el).find('.detpost');

      const link = parent.find('.thumb a').attr('href');
      const title = parent.find('.thumbz h2.jdlflm').text().trim();
      const image = parent.find('.thumbz img').attr('src');
      const episode = parent.find('.epz').text().trim();
      const day = parent.find('.epztipe').text().trim();
      const date = parent.find('.newnime').text().trim();

      if (title && link) {
        results.push({
          title,
          link,
          image,
          episode,
          day,
          date
        });
      }
    });

    res.status(200).json({ success: true, data: results });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}
