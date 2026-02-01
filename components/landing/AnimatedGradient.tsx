'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function AnimatedGradient() {
  const { scrollYProgress } = useScroll();

  // Smooth spring physics for scroll-based movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // Transform scroll for parallax with spring physics
  const y1 = useTransform(smoothProgress, [0, 1], ['0%', '80%']);
  const y2 = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const y3 = useTransform(smoothProgress, [0, 1], ['0%', '120%']);
  const y4 = useTransform(smoothProgress, [0, 1], ['0%', '70%']);
  const y5 = useTransform(smoothProgress, [0, 1], ['0%', '90%']);

  // Horizontal movement based on scroll
  const x1 = useTransform(smoothProgress, [0, 0.5, 1], ['0%', '15%', '-10%']);
  const x2 = useTransform(smoothProgress, [0, 0.5, 1], ['0%', '-20%', '10%']);
  const x3 = useTransform(smoothProgress, [0, 0.5, 1], ['0%', '25%', '5%']);

  // Scale based on scroll
  const scale1 = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.3, 1.1]);
  const scale2 = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1.4]);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none bg-white"
      style={{ zIndex: 0 }}
    >
      {/* Large orange particle - top right */}
      <motion.div
        className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full"
        style={{
          y: y1,
          x: x1,
          scale: scale1,
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, rgba(249, 115, 22, 0) 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 50, -30, 20, 0],
          y: [0, 40, -20, 30, 0],
          scale: [1, 1.15, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Medium orange particle - left side */}
      <motion.div
        className="absolute top-[25%] -left-32 w-[350px] h-[350px] rounded-full"
        style={{
          y: y2,
          x: x2,
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, rgba(251, 146, 60, 0) 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, 60, -20, 40, 0],
          y: [0, -30, 50, -10, 0],
          scale: [1, 1.2, 1.05, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating center particle */}
      <motion.div
        className="absolute top-[45%] left-[35%] w-[280px] h-[280px] rounded-full"
        style={{
          y: y3,
          x: x3,
          scale: scale2,
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.28) 0%, rgba(249, 115, 22, 0) 70%)',
          filter: 'blur(45px)',
        }}
        animate={{
          x: [0, -40, 60, -30, 40, 0],
          y: [0, 50, -30, 40, -20, 0],
          scale: [1, 1.25, 0.9, 1.15, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Large particle - bottom right */}
      <motion.div
        className="absolute top-[60%] -right-16 w-[450px] h-[450px] rounded-full"
        style={{
          y: y4,
          x: x1,
          background: 'radial-gradient(circle, rgba(253, 186, 116, 0.45) 0%, rgba(253, 186, 116, 0) 70%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, -40, 30, -50, 20, 0],
          y: [0, 30, -40, 20, -30, 0],
          scale: [1, 1.1, 1.2, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Extra particle - lower left */}
      <motion.div
        className="absolute top-[75%] -left-20 w-[320px] h-[320px] rounded-full"
        style={{
          y: y5,
          x: x2,
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.32) 0%, rgba(249, 115, 22, 0) 70%)',
          filter: 'blur(55px)',
        }}
        animate={{
          x: [0, 50, -30, 60, -20, 0],
          y: [0, -40, 30, -20, 40, 0],
          scale: [1, 1.12, 1.05, 1.18, 0.98, 1],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Small accent particle - mid right */}
      <motion.div
        className="absolute top-[35%] right-[15%] w-[200px] h-[200px] rounded-full"
        style={{
          y: y2,
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.22) 0%, rgba(249, 115, 22, 0) 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, -35, 45, -25, 35, 0],
          y: [0, 35, -45, 25, -35, 0],
          scale: [1, 1.3, 0.85, 1.2, 1.1, 1],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
