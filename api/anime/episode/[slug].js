export default async function handler(req, res) {
  const { slug } = req.query;
  try {
    const r = await fetch(`https://sankavollerei.com/anime/episode/${slug}`);
    const data = await r.json();
    res.status(200).json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, error: e.toString() });
  }
}        title,
        stream,
        servers,
        episodeList
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
