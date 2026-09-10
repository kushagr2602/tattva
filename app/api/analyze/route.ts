// POST /api/analyze — look at a product photo and suggest listing fields (OpenAI vision).
// Env: OPENAI_API_KEY, OPENAI_MODEL (default gpt-4o-mini), ADMIN_PASSWORD.

export const runtime = "nodejs";

const CATEGORIES = ["Diwali", "Wedding", "Pooja", "Home & Table"];

const PROMPT = `You help list a product for "Tattva", a catalogue of Indian silver (German-silver) gift items: pooja thalis, dry-fruit platters, kalash, gift boxes, trays, bowls, idols, frames and similar.
Look at the photo and respond with ONLY a JSON object with these keys:
- "name": a short product name, 2 to 5 words, title case (e.g. "Peacock Dry-Fruit Platter").
- "category": exactly one of "Diwali", "Wedding", "Pooja", "Home & Table".
- "blurb": one plain sentence describing the piece. No dashes. Do not use words like curated, handcrafted, elegant, timeless, exquisite.
- "reuse": one plain sentence on how it gets used again after the occasion.
- "fit": "contain" if the photo is portrait/tall or the item is shown inside a gift box, otherwise "cover".
Keep the voice plain and specific. Return only the JSON.`;

export async function POST(req: Request) {
  const { password, imageBase64, mediaType } = await req.json().catch(() => ({}));

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD)
    return Response.json({ error: "Wrong password." }, { status: 401 });
  if (!imageBase64) return Response.json({ error: "No image provided." }, { status: 400 });
  if (!process.env.OPENAI_API_KEY)
    return Response.json({ error: "OPENAI_API_KEY not set." }, { status: 500 });

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        max_tokens: 400,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: PROMPT },
              { type: "image_url", image_url: { url: `data:${mediaType || "image/jpeg"};base64,${imageBase64}` } },
            ],
          },
        ],
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      return Response.json({ error: "AI request failed", detail: t.slice(0, 300) }, { status: 502 });
    }
    const data = await r.json();
    const parsed = JSON.parse(data.choices?.[0]?.message?.content || "{}");
    if (!CATEGORIES.includes(parsed.category)) parsed.category = "Home & Table";
    parsed.fit = parsed.fit === "contain" ? "contain" : "cover";
    return Response.json({
      name: String(parsed.name || "").slice(0, 80),
      category: parsed.category,
      blurb: String(parsed.blurb || "").slice(0, 300),
      reuse: String(parsed.reuse || "").slice(0, 300),
      fit: parsed.fit,
    });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
