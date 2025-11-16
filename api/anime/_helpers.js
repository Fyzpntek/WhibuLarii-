import axios from 'axios';
import { load } from 'cheerio';

export const SITE = 'https://otakudesu.best';

const cache = new Map();

export async function fetchHTML(url, useCache=true, ttl=60){
  const key = 'html::' + url;
  const now = Date.now();
  if(useCache && cache.has(key)){
    const entry = cache.get(key);
    if(now - entry.ts < (ttl*1000)) return entry.html;
  }
  const res = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NeoRead/1.0)' },
    timeout: 10000
  });
  const html = res.data;
  cache.set(key, { html, ts: now });
  return html;
}

export function parseHTML(html){
  return load(html);
}
