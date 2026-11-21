"use client";

import { useEffect, useRef } from "react";
import LenisLib from "lenis";

export const Lenis = () => {
  const lenis = useRef<LenisLib | null>(null);

  useEffect(() => {
    // Initialisation de Lenis
    lenis.current = new LenisLib({
      duration: 1.2,  // Durée de l'animation de scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // Fonction easing pour l'effet de scrolling
    });

    // Fonction de mise à jour à chaque frame
    const onAnimationFrame = (time: number) => {
      lenis.current?.raf(time);
      requestAnimationFrame(onAnimationFrame);
    };

    requestAnimationFrame(onAnimationFrame);

    // Cleanup
    return () => {
      lenis.current?.destroy();
    };
  }, []);

  return null;
};
