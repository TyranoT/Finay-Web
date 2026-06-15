"use client";

import { animate, createTimeline, stagger } from "animejs";
import { useEffect, useRef } from "react";

/**
 * Configura as animações de entrada da tela de login com anime.js v4.
 *
 * @returns Refs para aplicar nos elementos animados da tela
 */
export function useLoginAnimation() {
  const brandRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const brand = brandRef.current;
    const form = formRef.current;
    if (!brand || !form) return;

    const tl = createTimeline({ defaults: { ease: "outCubic" } });

    tl.add(brand, {
      opacity: { from: 0, to: 1 },
      x: { from: -32 },
      duration: 700,
    });

    tl.add(
      form,
      {
        opacity: { from: 0, to: 1 },
        x: { from: 32 },
        duration: 700,
      },
      "-=500"
    );

    const formItems = formItemsRef.current
      ? Array.from(formItemsRef.current.querySelectorAll<HTMLElement>("[data-animate]"))
      : [];

    if (formItems.length > 0) {
      tl.add(
        formItems,
        {
          opacity: { from: 0, to: 1 },
          y: { from: 14 },
          delay: stagger(55),
          duration: 380,
        },
        "-=420"
      );
    }

    const blobs = Array.from(brand.querySelectorAll<HTMLElement>(".blob"));

    if (blobs.length > 0) {
      animate(blobs, {
        y: { from: "-8px", to: "8px" },
        duration: 3200,
        alternate: true,
        loop: true,
        ease: "inOutSine",
        delay: stagger(400),
      });
    }

    return () => {
      tl.pause();
    };
  }, []);

  return { brandRef, formRef, formItemsRef };
}
