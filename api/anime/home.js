export default async function handler(req, res) {
  try {
    const r = await fetch('https://sankavollerei.com/anime/home');
    const data = await r.json();
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('/api/anime/home error', err);
    res.status(500).json({ success: false, error: err.toString() });
  }
}
