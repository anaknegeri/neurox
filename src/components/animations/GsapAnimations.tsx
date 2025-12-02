"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useGsapScrollTrigger() {
  useEffect(() => {
    // Subtle fade-in for feature cards
    gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Simple fade for spec items
    gsap.utils.toArray<HTMLElement>(".spec-item").forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

interface HeroAnimationProps {
  heroRef: React.RefObject<HTMLElement | null>;
}

export function useHeroAnimation({ heroRef }: HeroAnimationProps) {
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Simple, professional hero animations
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-badge",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".hero-tagline",
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".hero-stats",
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
          "-=0.1"
        )
        .fromTo(
          ".hero-buttons",
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
          "-=0.1"
        )
        .fromTo(
          ".hero-image",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        );
    }, heroRef);

    return () => ctx.revert();
  }, [heroRef]);
}

export function useScanningAnimation() {
  const scanLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scanLineRef.current) return;

    gsap.to(scanLineRef.current, {
      y: "200%",
      duration: 1.5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return scanLineRef;
}

export function useTextSplitAnimation(
  ref: React.RefObject<HTMLElement | null>,
  trigger?: string
) {
  useEffect(() => {
    if (!ref.current) return;

    const text = ref.current.textContent || "";
    const chars = text.split("");

    ref.current.innerHTML = chars
      .map(
        (char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`
      )
      .join("");

    gsap.fromTo(
      ref.current.querySelectorAll(".char"),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.02,
        ease: "power3.out",
        scrollTrigger: trigger
          ? {
              trigger,
              start: "top 80%",
              toggleActions: "play none none none",
            }
          : undefined,
      }
    );
  }, [ref, trigger]);
}

export function useNumberCounter(
  ref: React.RefObject<HTMLElement | null>,
  endValue: number,
  duration: number = 2
) {
  useEffect(() => {
    if (!ref.current) return;

    const obj = { value: 0 };

    gsap.to(obj, {
      value: endValue,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.value).toString();
        }
      },
    });
  }, [ref, endValue, duration]);
}
