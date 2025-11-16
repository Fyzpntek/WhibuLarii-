import { SITE, fetchHTML, parseHTML } from '../_helpers.js';

export default async function handler(req, res) {
  try {
    const { slug } = req.query;

    const url = SITE + '/anime/' + slug;
    const html = await fetchHTML(url);
    const $ = parseHTML(html);

    const title = $('h1.entry-title, .post-title').first().text().trim();
    const synopsis = $('.sinopc, .entry-content').first().text().trim();
    const image = $('.thumb img').first().attr('src') || '';

    const genres = [];
    $('.genre a').each((i, el) => genres.push($(el).text().trim()));

    const episodes = [];
    $('.eps a, .episode-list a').each((i, el) => {
      episodes.push({
        epTitle: $(el).text().trim(),
        epUrl: $(el).attr('href')
      });
    });

    res.status(200).json({ success: true, data: { title, synopsis, image, genres, episodes } });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed', error: err.message });
  }
}
