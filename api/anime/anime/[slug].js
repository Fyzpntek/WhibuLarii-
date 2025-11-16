export default async function handler(req, res) {
  try {
    const { slug } = req.query;
    const url = `https://otakudesu.best/anime/${slug}/`;

    const html = await fetch(url).then(r => r.text());

    // Title
    const title = (html.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1] || "").trim();

    // Image
    const image = html.match(/<img[^>]+src="([^"]+)"[^>]*class="attachment-post-thumbnail"/)?.[1] || "";

    // Synopsis
    const synopsis = html.match(/<p>(.*?)<\/p>/s)?.[1].replace(/<[^>]+>/g,"").trim() || "";

    // Genres
    const genres = [...html.matchAll(/\/genre\/([^"]+)"/g)].map(m => m[1]);

    // Episodes
    const episodes = [...html.matchAll(/<a href="([^"]+)"[^>]*class="epsleft">([^<]+)<\/a>/g)]
      .map(m => ({
        url: m[1],
        title: m[2]
      }));

    return res.status(200).json({
      success: true,
      data: {
        title,
        image,
        synopsis,
        genres,
        episodes
      }
    });

  } catch (e) {
    console.error("DETAIL ERROR:", e);
    return res.status(500).json({
      success: false,
      error: "SCRAPE_FAILED"
    });
  }
}    // ============================
    //  IMAGE
    // ============================
    const image = $(".fotoanime img").attr("src") || null;

    // ============================
    //  INFO BOX (Judul, Type, Status, Studio, dll)
    // ============================
    const info = {};
    $(".infozingle p").each((_, el) => {
      const raw = $(el).text().trim();
      const split = raw.split(":");

      if (split.length >= 2) {
        const key = split[0].trim();
        const val = split.slice(1).join(":").trim();
        info[key] = val;
      }
    });

    // ============================
    //  SYNOPSIS
    // ============================
    const synopsis = $(".sinopc").text().trim() || null;

    // ============================
    //  EPISODE LIST
    // ============================
    const episodes = [];
    $(".episodelist ul li").each((_, el) => {
      const epTitle = $(el).find("a").text().trim();
      const epLink = $(el).find("a").attr("href");
      const date = $(el).find(".zeebr").text().trim();

      if (epTitle && epLink) {
        episodes.push({
          title: epTitle,
          link: epLink,
          date,
        });
      }
    });

    // ============================
    //  BATCH LINKS (kalau ada)
    // ============================
    const batch = [];
    $(".smokelister:contains('Batch')")
      .next("ul")
      .find("li a")
      .each((_, el) => {
        batch.push({
          title: $(el).text().trim(),
          link: $(el).attr("href"),
        });
      });

    // ============================
    //  FINAL RESPONSE
    // ============================
    return res.status(200).json({
      success: true,
      data: {
        title,
        slug,
        image,
        info,
        synopsis,
        episodes,
        batch,
        source: url,
      },
    });

  } catch (err) {
    console.error("DETAIL ERROR:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to load anime detail.",
      error: err.message,
    });
  }
        }
