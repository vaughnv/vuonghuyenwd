'use client';
import FadeIn from './anim/FadeIn';
import Image from 'next/image';

export default function Gallery() {
  const images = [
    "/images/1763782541098-img-1.webp",
    "/images/1763782545297-img-2.webp",
    "/images/1763782549900-img-3.webp",
    "/images/1763782554631-img-4.webp",
    "/images/1763782562088-img-5.webp",
    "/images/1763782568210-img-6.webp",
    "/images/1763782573404-img-8.webp",
    "/images/1763782577618-img-9.webp",
  ];

  return (
    <div id="card-gallery" style={{ order: 9 }}>
        <div className="inner">
            <div className="image-split-container flex justify-center items-center mt-6 w-full gap-1.5">
                <FadeIn direction="left" className="image-part left-part relative h-[260px] flex-1 overflow-hidden" >
                    <Image 
                        src="/images/1763782535978-couple.webp" 
                        alt="Couple Left" 
                        fill
                        className="object-cover scale-[3] origin-left"
                        style={{ objectPosition: "0% 30%" }}
                        sizes="(max-width: 768px) 33vw, 25vw"
                    />
                </FadeIn>
                <FadeIn direction="up" className="image-part middle-part relative h-[350px] w-1/3 flex-none overflow-hidden">
                    <Image 
                        src="/images/1763782535978-couple.webp" 
                        alt="Couple Middle" 
                        fill
                        className="object-cover scale-[3.2]"
                        style={{ objectPosition: "50% 20%" }}
                        sizes="(max-width: 768px) 33vw, 25vw"
                    />
                </FadeIn>
                <FadeIn direction="right" className="image-part right-part relative h-[260px] flex-1 overflow-hidden">
                    <Image 
                        src="/images/1763782535978-couple.webp" 
                        alt="Couple Right" 
                        fill
                        className="object-cover scale-[3] origin-right"
                        style={{ objectPosition: "100% 24%" }}
                        sizes="(max-width: 768px) 33vw, 25vw"
                    />
                </FadeIn>
            </div>

            <FadeIn direction="right" delay={0.3}>
                <h2 className="card-gallery-title">
                    Our Memories
                </h2>
            </FadeIn>
            
            <div className="photo-grid grid grid-cols-2 gap-1">
                {images.map((src, i) => (
                    <FadeIn key={i} direction={i % 2 === 0 ? "left" : "right"} className="photo relative w-full aspect-[3/4]">
                        <Image 
                            src={src} 
                            alt={`Memory ${i+1}`} 
                            fill
                            className="object-cover rounded-sm"
                            sizes="(max-width: 768px) 50vw, 33vw"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                        />
                    </FadeIn>
                ))}
            </div>
        </div>
    </div>
  );
}
