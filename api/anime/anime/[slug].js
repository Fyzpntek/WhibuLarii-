export default async function handler(req, res) {
  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Slug tidak ditemukan."
      });
    }

    const target = `https://www.sankavollerei.com/anime/anime/${slug}`;

    const response = await fetch(target, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: `API Error ${response.status}`,
      });
    }

    const json = await response.json();

    return res.status(200).json({
      success: true,
      data: json.data  // langsung kirim data otaknya
    });

  } catch (err) {
    console.error("DETAIL API ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load detail",
      error: err.message
    });
  }
}
