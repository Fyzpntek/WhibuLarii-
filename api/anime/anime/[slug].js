import { SITE, fetchHTML, parseHTML } from './_helpers.js';

export default async function handler(req, res) {
  try {
    const { slug } = req.query;
    const url = `${SITE}/anime/${slug}/`;

    const html = await fetchHTML(url);
    const $ = parseHTML(html);

    const title = $('.jdlrx h1').text().trim();
    const image = $('.fotoanime img').attr('src');

    // INFO
    const info = {};
    $('.infozingle p').each((i, el) => {
      const text = $(el).text().split(':');
      if (text.length >= 2) {
        info[text[0].trim()] = text.slice(1).join(':').trim();
      }
    });

    // SINOPSIS
    const synopsis = $('.sinopc').text().trim();

    // EPISODES
    const episodes = [];
    $('.episodelist ul li').each((i, el) => {
      const epTitle = $(el).find('a').text().trim();
      const epLink = $(el).find('a').attr('href');
      const date = $(el).find('.zeebr').text().trim();

      episodes.push({
        title: epTitle,
        link: epLink,
        date
      });
    });

    res.status(200).json({
      success: true,
      data: {
        title,
        image,
        info,
        synopsis,
        episodes
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
