export async function fetchAPI(path) {
  const url = "https://api.sankavollerei.com" + path;

  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept": "application/json",
          "Cache-Control": "no-cache"
        }
      });

      if (!res.ok) {
        console.log("Try:", i + 1, "Status:", res.status);
        continue;
      }

      return await res.json();
    } catch (err) {
      console.log("Error on attempt", i + 1);
    }
  }

  return { success: false, error: "FAILED_AFTER_3_RETRY" };
}
