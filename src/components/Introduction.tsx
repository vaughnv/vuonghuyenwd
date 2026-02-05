'use client';

import { motion } from 'framer-motion';
import FadeIn from './anim/FadeIn';
import Image from 'next/image';

const MotionImage = motion(Image);

export default function Introduction() {
  return (
    <div id="groom-bride" className="card-section" style={{ order: 2 }}>
        <MotionImage 
            src="/images/decor-flower1.webp" 
            alt="Decor Flower 1"
            width={300}
            height={300}
            className="decor-flower1" 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        />
        <MotionImage 
            src="/images/decor-flower2.webp" 
            alt="Decor Flower 2"
            width={300}
            height={300}
            className="decor-flower2" 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        />

        <FadeIn direction="up">
            <h2 className="title">
                When two hearts<br/>beat as one
            </h2>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.2}>
            <div className="vertical-line"></div>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.3}>
            <h4 className="sub-title">
                They create a soul strong<br/>enough to last forever
            </h4>
        </FadeIn>

        <div className="groom-bride-box nha-trai">
            <motion.div 
                className="gb-box groom relative overflow-hidden" 
                initial={{ opacity: 0, x: -50, rotate: -5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                 <Image 
                    src="/images/1763782517309-groom.webp"
                    alt="Chú rể"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                 />
                 <FadeIn direction="up" delay={0.5} className="info relative z-10">
                    <div className="label">Chú rể</div>
                    <div className="fullname">Viết Hiếu</div>
                 </FadeIn>
            </motion.div>
            
            <motion.div 
                className="gb-box bride relative overflow-hidden" 
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                 <Image 
                    src="/images/1763782508033-bride.webp"
                    alt="Cô dâu"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                 />
                 <FadeIn direction="up" delay={0.5} className="info relative z-10">
                    <div className="label">Cô dâu</div>
                    <div className="fullname">Ánh Nguyệt</div>
                 </FadeIn>
            </motion.div>
        </div>
    </div>
  );
}
