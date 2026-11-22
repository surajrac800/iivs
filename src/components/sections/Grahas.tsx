"use client";
import { useState } from "react";
import { grahas } from "@/lib/data";

export default function Grahas() {
  const [i, setI] = useState(0);
  const g = grahas[i];
  return (
    <section id="grahas" className="section">
      <h2 className="reveal">The Nine Grahas</h2>
      <div className="tabs reveal">
        {grahas.map((x, k) => (
          <button key={x.n} className={`btn ${k === i ? "gold" : ""}`} onClick={() => setI(k)}>{x.n}</button>
        ))}
      </div>
      <div className="panel reveal">
        <h3>{g.n} <small>({g.en})</small></h3>
        <p>{g.d}</p>
        {g.node && <p className="gold-t">Lunar nodes are points on the Moon&apos;s orbit, not physical bodies.</p>}
      </div>
    </section>
  );
}
