'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Category from '../common/Category';
import type { ProvinceItem } from 'app/hooks/type';

interface Props {
  items: ProvinceItem[];
}

export default function ProvinceCarousel({ items }: Props) {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
  }, [items]);

  return (
    <div className="w-full flex justify-center items-center mt-2">
      <div className="w-full max-w-3xl overflow-hidden">
        <motion.div
          ref={carouselRef}
          drag="x"
          whileDrag={{ scale: 0.97 }}
          dragElastic={0.2}
          dragConstraints={{ right: 0, left: -width }}
          dragTransition={{ bounceDamping: 30 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex gap-1 will-change-transform cursor-grab active:cursor-grabbing"
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.city + idx}
              className="min-w-[28rem] md:min-w-[18rem] flex-shrink-0"
            >
              <Category Province={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}