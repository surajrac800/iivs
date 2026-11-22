"use client";
import { useState } from "react";

export default function Kundli() {
  const [msg, setMsg] = useState("");
  const [data, setData] = useState<unknown>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setMsg(""); setData(null);
    const body = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch("/api/kundli", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json();
      if (!r.ok) setMsg(j.error ?? "Something went wrong."); else setData(j);
    } catch { setMsg("Network error. Please try again."); }
    setBusy(false);
  }

  return (
    <section id="kundli" className="section">
      <h2 className="reveal">Your Life, Written in the Stars</h2>
      <form className="panel form reveal" onSubmit={submit}>
        <label>Full Name<input name="name" required /></label>
        <label>Date of Birth<input name="dob" type="date" required /></label>
        <label>Time of Birth<input name="tob" type="time" required /></label>
        <label>Place of Birth<input name="place" required /></label>
        <label>Gender (optional)<select name="gender"><option value="">—</option><option>Female</option><option>Male</option><option>Other</option></select></label>
        <button className="btn gold" disabled={busy}>{busy ? "Calculating…" : "Generate My Kundli"}</button>
      </form>
      {msg && <p className="panel gold-t" role="alert">{msg}</p>}
      {data !== null && <pre className="panel result">{JSON.stringify(data, null, 2)}</pre>}
    </section>
  );
}
