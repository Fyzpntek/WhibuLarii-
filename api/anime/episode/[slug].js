import { SITE, fetchHTML, parseHTML } from '../_helpers.js';

export default async function handler(req, res) {
  try {
    const { slug } = req.query;

    const url = SITE + '/' + slug;
    const html = await fetchHTML(url);
    const $ = parseHTML(html);

    const images = [];
    $('.post-content img, .entry img').each((i, el) => {
      const src = $(el).attr('src');
      if (src) images.push(src);
    });

    res.status(200).json({ success: true, images });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Episode failed', error: err.message });
  }
}
