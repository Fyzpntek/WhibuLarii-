import { SITE, fetchHTML, parseHTML } from './_helpers.js';

export default async function handler(req, res) {
  try {
    const { slug } = req.query;
    const url = `${SITE}/episode/${slug}/`;

    const html = await fetchHTML(url);
    const $ = parseHTML(html);

    const title = $('h1.entry-title').text().trim();

    // MAIN STREAM
    const stream = $('.player-area iframe').attr('src');

    // STREAM SERVERS
    const servers = [];
    $('.mirrorstream ul li a').each((i, el) => {
      servers.push({
        name: $(el).text().trim(),
        id: $(el).attr('data-video') || null
      });
    });

    // LIST OF EPISODES
    const episodeList = [];
    $('#selectEpisode option').each((i, el) => {
      episodeList.push({
        title: $(el).text().trim(),
        url: $(el).attr('value')
      });
    });

    res.status(200).json({
      success: true,
      data: {
        title,
        stream,
        servers,
        episodeList
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
