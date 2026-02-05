'use client';
import { useState, useRef, useEffect } from 'react';
import { Music } from 'lucide-react';

export default function MusicPlayer() {
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
      <audio ref={audioRef} src="/leduong.mp3" loop hidden />
      <button 
        id="audioToggleBtn" 
        className={`fixed bottom-5 right-4 w-[50px] h-[50px] rounded-full border-none bg-black/50 text-white cursor-pointer shadow-lg z-50 transition-all hover:opacity-100 opacity-40 flex items-center justify-center ${isPlaying ? 'animate-spin opacity-100' : ''}`}
        onClick={(e) => { e.stopPropagation(); toggle(); }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        style={{ animationDuration: '5s' }}
      >
         <Music size={24} />
         {!isPlaying && (
             <div className="absolute w-[3px] h-[36px] bg-white rotate-45 left-[23px] top-[7px]" />
         )}
      </button>
    </>
  );
}
