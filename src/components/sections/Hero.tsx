"use client";
import dynamic from "next/dynamic";
const CosmicScene = dynamic(() => import("@/components/3d/CosmicScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#070817]" />,
});

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div style={{ position: "absolute", inset: 0 }}><CosmicScene /></div>
      <div className="hero-copy">
        <h1>Discover The Universe Within You</h1>
        <p>Explore the ancient wisdom of Vedic Astrology and discover how the cosmic alignment shapes your journey.</p>
        <div className="cta">
          <a className="btn gold" href="#kundli">Explore Your Horoscope</a>
          <a className="btn" href="#grahas">Discover Your Cosmic Path</a>
        </div>
      </div>
    </section>
  );
}
