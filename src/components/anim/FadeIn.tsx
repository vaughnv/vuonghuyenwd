'use client';

import { motion, UseInViewOptions, Variants } from 'framer-motion';
import { ReactNode, CSSProperties } from 'react';

interface FadeInProps {
  children?: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  fullWidth?: boolean;
  once?: boolean;
  style?: CSSProperties;
  id?: string;
}

export default function FadeIn({ 
  children, 
  delay = 0, 
  className = "", 
  direction = 'up', 
  duration = 0.8,
  fullWidth = false,
  once = true,
  style,
  id
}: FadeInProps) {
  
  const variants: Variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration, delay, ease: "easeOut" }
    }
  };

  if (direction === 'none') {
    variants.hidden = { opacity: 0, y: 0, x: 0 };
  }

  const combinedStyle = fullWidth ? { width: '100%', ...style } : style;

  const optimizedStyle: CSSProperties = {
    ...combinedStyle,
    willChange: 'opacity, transform', 
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: "0px 0px -50px 0px" }}
      variants={variants}
      className={className}
      style={optimizedStyle}
      id={id}
    >
      {children}
    </motion.div>
  );
}
