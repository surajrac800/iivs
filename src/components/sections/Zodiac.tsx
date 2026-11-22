"use client";
import { useState } from "react";
import { zodiac } from "@/lib/data";

export default function Zodiac() {
  const [sel, setSel] = useState<number | null>(null);
  const z = sel !== null ? zodiac[sel] : null;
  return (
    <section id="zodiac" className="section">
      <h2 className="reveal">The Twelve Rashis</h2>
      <div className="grid">
        {zodiac.map((x, i) => (
          <button key={x.n} className="card reveal" onClick={() => setSel(i)} aria-label={`${x.n} details`}>
            <span className="sym">{x.s}</span><b>{x.n}</b><small>{x.e}</small>
          </button>
        ))}
      </div>
      {z && (
        <div className="modal" role="dialog" aria-modal="true" onClick={() => setSel(null)}>
          <div className="panel" onClick={(e) => e.stopPropagation()}>
            <span className="sym big">{z.s}</span>
            <h3>{z.n}</h3><p className="gold-t">Element: {z.e}</p><p>{z.d}</p>
            <button className="btn" onClick={() => setSel(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
