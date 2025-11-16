export default async function handler(req, res) {
  try {
    const { slug } = req.query;
    const target = `https://otakudesu.best/anime/${slug}/`;

    const html = await fetch(target, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Upgrade-Insecure-Requests": "1",
        "Referer": "https://otakudesu.best/"
      }
    }).then(r => r.text());

    // TITLE
    const title = (html.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1] || "").trim();

    // IMAGE
    const image =
      html.match(/<img[^>]+src="([^"]+)"[^>]*class="attachment-post-thumbnail"/)?.[1] ||
      "";

    // SYNOPSIS
    const synopsis =
      html.match(/<div class="deskrip">[\s\S]*?<p>([\s\S]*?)<\/p>/)?.[1]
        ?.replace(/<[^>]+>/g, "")
        ?.trim() || "";

    // GENRES
    const genres = [...html.matchAll(/\/genre\/([^"]+)"/g)].map(m => m[1]);

    // EPISODES
    const episodes = [...html.matchAll(/<a href="([^"]+)"[^>]*class="epsleft">([^<]+)<\/a>/g)]
      .map(m => ({
        url: m[1],
        title: m[2]
      }));

    return res.status(200).json({
      success: true,
      data: { title, image, synopsis, genres, episodes }
    });

  } catch (err) {
    console.error("DETAIL SCRAPE ERROR:", err);
    return res.status(500).json({
      success: false,
      error: err.toString()
    });
  }
}
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
