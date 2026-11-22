import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  title: "Cosmic Vedic Astrology | Discover The Universe Within You",
  description: "Explore Vedic astrology, the twelve rashis, the nine grahas and your Kundli in an immersive 3D cosmos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <header className="nav">
          <a href="#home" className="logo">✦ Cosmos</a>
          <nav aria-label="Primary"><a href="#zodiac">Zodiac</a><a href="#grahas">Grahas</a><a href="#kundli">Kundli</a></nav>
        </header>
        <main>{children}</main>
        <footer className="foot">Astrological content is for guidance and reflection, not a guarantee of outcomes.</footer>
      </body>
    </html>
  );
}
