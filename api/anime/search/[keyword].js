export default async function handler(req, res) {
  const { keyword } = req.query;
  try {
    const r = await fetch(`https://sankavollerei.com/anime/search/${keyword}`);
    const data = await r.json();
    res.status(200).json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, error: e.toString() });
  }
}
