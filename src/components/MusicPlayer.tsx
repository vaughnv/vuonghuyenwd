'use client';
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer({ showButton = true }: { showButton?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              cleanup();
            })
            .catch((e) => {
              
            });
        }
      }
    };

    const cleanup = () => {
        document.removeEventListener('click', playAudio);
        document.removeEventListener('touchstart', playAudio);
        window.removeEventListener('scroll', playAudio);
        window.removeEventListener('wheel', playAudio);
        window.removeEventListener('keydown', playAudio);
        window.removeEventListener('play-music', playAudio);
    };
    
    playAudio();

    document.addEventListener('click', playAudio);
    document.addEventListener('touchstart', playAudio);
    window.addEventListener('scroll', playAudio);
    window.addEventListener('wheel', playAudio);
    window.addEventListener('keydown', playAudio);
    window.addEventListener('play-music', playAudio);
    
    return cleanup;
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/i_do.mp3"
        loop
        hidden
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {showButton && (
        <button
          type="button"
          aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
          className={`fixed bottom-5 w-[46px] h-[46px] rounded-full border border-white/20 bg-[var(--wc-primary)]/90 text-white cursor-pointer shadow-lg z-50 transition-all hover:opacity-100 flex items-center justify-center ${isPlaying ? 'opacity-100' : 'opacity-70'}`}
          onClick={(e) => { e.stopPropagation(); toggle(); }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          style={{ right: 'max(16px, calc((100vw - 575px) / 2 + 16px))' }}
        >
          {isPlaying ? <Volume2 size={20} strokeWidth={2} /> : <VolumeX size={20} strokeWidth={2} />}
        </button>
      )}
    </>
  );
}
