export default async function handler(req, res) {
  try {
    const r = await fetch("https://sankavollerei.com/anime/home");
    const data = await r.json();
    res.status(200).json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, error: e.toString() });
  }
}    res.status(500).json({ success: false, message: err.message });
  }
}
