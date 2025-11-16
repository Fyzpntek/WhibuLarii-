export default async function handler(req, res) {
  const { slug } = req.query;
  try {
    const r = await fetch(`https://sankavollerei.com/anime/anime/${slug}`);
    const data = await r.json();
    res.status(200).json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, error: e.toString() });
  }
}    // EPISODES
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
