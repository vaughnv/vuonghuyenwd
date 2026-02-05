'use client';
import { useState, useRef, useEffect } from 'react';
import { Music } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleInteract = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            cleanup();
          })
          .catch((e) => {
            
          });
      }
    };

    const cleanup = () => {
        document.removeEventListener('click', handleInteract);
        document.removeEventListener('touchstart', handleInteract);
        window.removeEventListener('scroll', handleInteract);
        window.removeEventListener('wheel', handleInteract);
        window.removeEventListener('keydown', handleInteract);
    };
    
    document.addEventListener('click', handleInteract);
    document.addEventListener('touchstart', handleInteract);
    window.addEventListener('scroll', handleInteract);
    window.addEventListener('wheel', handleInteract);
    window.addEventListener('keydown', handleInteract);
    
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
