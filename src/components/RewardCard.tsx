import { motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';

import NextImage from '@/components/NextImage';

const RewardCard = (props: { thumbnail: string; rewardName: string }) => {
  const { thumbnail, rewardName } = props;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ['17.5deg', '-17.5deg'], {
    clamp: true,
  });

  const rotateY = useTransform(x, [-0.5, 0.5], ['-17.5deg', '17.5deg'], {
    clamp: true,
  });

  const handleMouse = (event: any) => {
    const rect = event.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPercent = mouseX / width - 0.5;
    const yPercent = mouseY / height - 0.5;

    x.set(xPercent);
    y.set(yPercent);
  };

  return (
    <div>
      <motion.div
        className='relative bg-card h-[250px] w-[250px] overflow-hidden rounded-3xl shadow-2xl border-2 border-gradient-to-r'
        onMouseMove={handleMouse}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center',
          rotateX,
          rotateY,
        }}
      >
        <div
          className='absolute select-none'
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(75px)',
          }}
        >
          <NextImage
            alt={rewardName}
            src={thumbnail}
            width={250}
            height={250}
            useSkeleton={true}
          />
        </div>
        <div
          className='absolute h-[250px] w-[250px] reward-effect'
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(50px)',
          }}
        ></div>
      </motion.div>
      <p className='font-bold text-center mt-2'>{rewardName}</p>
    </div>
  );
};

export { RewardCard };
