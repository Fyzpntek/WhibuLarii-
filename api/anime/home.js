import { fetchAPI } from "../_fetch";

export default async function handler(req, res) {
  try {
    const data = await fetchAPI("/anime/home");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ success: false, error: "SERVER_ERROR" });
  }
}
