import { SITE, fetchHTML, parseHTML } from './_helpers.js';

export default async function handler(req, res) {
  try {
    let { slug } = req.query;

    // ============================
    //  AUTO FIX SLUG INPUT
    // ============================
    if (!slug) {
      return res.status(400).json({ success: false, message: "Slug is required" });
    }

    slug = decodeURIComponent(slug)
      .replace(SITE, "")
      .replace("https://", "")
      .replace("http://", "")
      .replace("otakudesu.best", "")
      .replace("/anime/", "")
      .replace(/\/+$/, "")     // remove trailing slash
      .replace(/^\/+/, "")     // remove beginning slash
      .trim();

    const url = `${SITE}/anime/${slug}/`;

    // Fetch HTML
    const html = await fetchHTML(url);
    const $ = parseHTML(html);

    // ============================
    //  TITLE
    // ============================
    const title = $(".jdlrx h1").text().trim() ||
                  $(".entry-title").text().trim() ||
                  null;

    // ============================
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
