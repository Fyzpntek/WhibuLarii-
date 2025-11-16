Otakudesu - Vercel Ready (Frontend + Serverless API)

Contents:
 - index.html            (futuristic frontend)
 - api/anime/*.js        (Vercel serverless endpoints)

How to deploy (zero-ribet):
1. Upload this project to a new GitHub repo (push or upload zip).
2. Go to Vercel -> Import Project -> Select the GitHub repo.
3. Deploy. Vercel will install dependencies and expose API routes under /api/anime/*.

Important:
- Default scraping target site is set via OT_SITE environment variable.
  If the site domain differs, set an environment variable in Vercel named OT_SITE (e.g. https://otakudesu.id).
- Serverless functions include a tiny in-memory cache to reduce hits.
- If pages use Cloudflare or anti-bot protections, scraping may fail.

Endpoints implemented:
 - GET /api/anime/home
 - GET /api/anime/search/:keyword
 - GET /api/anime/anime/:slug
 - GET /api/anime/episode/:slug

You can edit API selectors if needed to match the real otakudesu HTML structure.
