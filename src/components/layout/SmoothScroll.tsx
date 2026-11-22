"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
      gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" } })
    );
    return () => { gsap.ticker.remove(tick); lenis.destroy(); ScrollTrigger.getAll().forEach((s) => s.kill()); };
  }, []);
  return null;
}
