// src/hooks/useTypewriter.ts
import { useEffect, useMemo, useRef, useState } from "react";

export function useTypewriter(text: string, cps = 22, isActive = true) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTick = useRef(0);

  // Respect prefers-reduced-motion
  const reduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  // Reset when text changes
  useEffect(() => {
    indexRef.current = 0;
    setOutput("");
    setDone(false);
  }, [text]);

  // Animate
  useEffect(() => {
    // If not active or reduced motion, render instantly
    if (!isActive || reduced) {
      indexRef.current = text.length;
      setOutput(text);
      setDone(true);
      return;
    }

    const step = (ts: number) => {
      if (!lastTick.current) lastTick.current = ts;
      const delta = ts - lastTick.current;

      // reveal rate: cps = characters per second
      if (delta >= 1000 / cps) {
        lastTick.current = ts;
        const next = Math.min(indexRef.current + 1, text.length);
        indexRef.current = next;
        setOutput(text.slice(0, next));
        if (next >= text.length) {
          setDone(true);
          rafRef.current = null;
          return; // stop
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTick.current = 0;
    };
  }, [text, cps, isActive, reduced]);

  const skip = () => {
    // cancel RAF + jump to end
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    indexRef.current = text.length;
    setOutput(text);
    setDone(true);
  };

  return { output, done, skip };
}
