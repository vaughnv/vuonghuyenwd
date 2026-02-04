'use client';

import { motion } from 'framer-motion';
import FadeIn from './anim/FadeIn';

export default function Introduction() {
  return (
    <div id="groom-bride" className="card-section" style={{ order: 2 }}>
        <motion.img 
            src="/images/decor-flower1.webp" 
            className="decor-flower1" 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        />
        <motion.img 
            src="/images/decor-flower2.webp" 
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
                className="gb-box groom" 
                style={{ backgroundImage: "url(/images/1763782517309-groom.webp)" }}
                initial={{ opacity: 0, x: -50, rotate: -5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                 <FadeIn direction="up" delay={0.5} className="info">
                    <div className="label">Chú rể</div>
                    <div className="fullname">Viết Hiếu</div>
                 </FadeIn>
            </motion.div>
            
            <motion.div 
                className="gb-box bride" 
                style={{ backgroundImage: "url(/images/1763782508033-bride.webp)" }}
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                 <FadeIn direction="up" delay={0.5} className="info">
                    <div className="label">Cô dâu</div>
                    <div className="fullname">Ánh Nguyệt</div>
                 </FadeIn>
            </motion.div>
        </div>
    </div>
  );
}
