export const dynamic = "force-dynamic";

export default async function handler(req, res) {
  try {
    const { slug } = req.query;

    const url = `https://www.sankavollerei.com/anime/anime/${slug}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Accept: "application/json",
      }
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ success: false, message: "Remote API ERROR" });
    }

    const json = await response.json();

    // Kamu HARUS return { success:true, data:{...} }
    return res.status(200).json({
      success: true,
      data: json.data
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
