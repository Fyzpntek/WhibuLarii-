export const dynamic = "force-dynamic";

export default async function handler(req, res) {
  try {
    let { slug } = req.query;

    // ==============================
    // FIX: Bersihkan slug (kalau full URL)
    // ==============================
    if (slug.includes("/")) {
      slug = slug.split("/").filter(Boolean).pop();
    }

    const url = `https://www.sankavollerei.com/anime/anime/${slug}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Accept: "application/json",
      }
    });

    if (!response.ok) {
      console.log("REMOTE ERROR", response.status);
      return res.status(500).json({
        success: false,
        message: `Remote API returned ${response.status}`
      });
    }

    const json = await response.json();

    // Pastikan format cocok dengan frontend
    return res.status(200).json({
      success: true,
      data: json.data || json
    });

  } catch (err) {
    console.error("DETAIL ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "SCRAPE_FAILED",
      error: err.message,
    });
  }
}
