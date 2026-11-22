import { NextResponse } from "next/server";

// Calculation is delegated to a verified astrology API. No fake data is ever returned.
export async function POST(req: Request) {
  const url = process.env.KUNDLI_API_URL;
  const key = process.env.KUNDLI_API_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "Kundli engine is not configured yet. Set KUNDLI_API_URL and KUNDLI_API_KEY in Vercel environment variables." },
      { status: 501 }
    );
  }
  const input = await req.json();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify(input),
  });
  if (!res.ok) return NextResponse.json({ error: "Calculation provider returned an error." }, { status: 502 });
  return NextResponse.json(await res.json());
}
