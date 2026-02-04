import { useEffect, useRef } from 'react';
import { useLenis } from '@/components/SmoothScrollProvider';

export function useAutoScroll(start: boolean, speed: number = 1) {
  const { lenis } = useLenis();
  const isScrollingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start || !lenis) return;

    isScrollingRef.current = true;

    const stopScrolling = () => {
      isScrollingRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };

    const scrollStep = () => {
      if (!isScrollingRef.current) return;

      const currentScroll = lenis.scroll;
      const target = currentScroll + speed;
      
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      
      if (currentScroll >= maxScroll - 2) {
        stopScrolling();
        return;
      }

      lenis.scrollTo(target, { immediate: true });
      animationFrameRef.current = requestAnimationFrame(scrollStep);
    };

    animationFrameRef.current = requestAnimationFrame(scrollStep);

    const handleUserInteraction = () => {
      stopScrolling();
    };

    window.addEventListener('wheel', handleUserInteraction);
    window.addEventListener('touchmove', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    window.addEventListener('mousedown', handleUserInteraction);

    return () => {
      stopScrolling();
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('mousedown', handleUserInteraction);
    };
  }, [start, speed, lenis]);
}
