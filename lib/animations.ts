import { Variants } from 'framer-motion';

// Timing constants
export const TIMING = {
  quick: 0.15,
  normal: 0.2,
  smooth: 0.3,
};

// Easing
export const EASING = [0.4, 0, 0.2, 1];

// Fade animations
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// Scale animations
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const scaleInCenter: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// Slide animations
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

// Stagger children
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

// Card hover
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
    transition: {
      duration: TIMING.normal,
      ease: EASING,
    },
  },
};

// Heart button
export const heartPulse: Variants = {
  initial: { scale: 1 },
  tap: { scale: 0.85 },
  saved: {
    scale: [1, 1.3, 1],
    transition: {
      duration: 0.3,
      times: [0, 0.5, 1],
    },
  },
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: TIMING.smooth, ease: EASING },
};

// Filter panel
export const filterPanelVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING,
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: TIMING.normal,
      ease: EASING,
    },
  },
};

// Gallery
export const gallerySlide: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

// Toast notification
export const toastVariants: Variants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.9 },
};

// Wizard step
export const wizardStepVariants: Variants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

// Transition presets
export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const smoothTransition = {
  duration: TIMING.smooth,
  ease: EASING,
};

export const quickTransition = {
  duration: TIMING.quick,
  ease: EASING,
};
