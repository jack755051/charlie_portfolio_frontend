import type { MotionVariants, Transition } from '@vueuse/motion'

type MotionPreset = MotionVariants<never>

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

const spring = (overrides: Partial<Transition> = {}): Transition => ({
  type: 'spring',
  stiffness: 300,
  damping: 28,
  mass: 0.8,
  ...overrides,
})

const tween = (duration = 0.34, delay = 0): Transition => ({
  type: 'tween',
  duration,
  delay,
  ease: easeOut,
})

const reveal = (y = 28, delay = 0): MotionPreset => ({
  initial: {
    opacity: 0,
    y,
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: spring({ delay }),
  },
})

export const useMotionPresets = () => {
  const page: MotionPreset = {
    initial: {
      opacity: 0,
      y: 14,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: tween(0.42),
    },
  }

  const section = reveal(34)
  const heading = reveal(24, 0.04)

  const card: MotionPreset = {
    ...reveal(24),
    hovered: {
      y: -8,
      scale: 1.018,
      transition: spring({ stiffness: 420, damping: 26 }),
    },
    tapped: {
      y: -2,
      scale: 0.986,
      transition: spring({ stiffness: 520, damping: 32 }),
    },
  }

  const subtleCard: MotionPreset = {
    ...reveal(18),
    hovered: {
      y: -5,
      scale: 1.012,
      transition: spring({ stiffness: 390, damping: 28 }),
    },
    tapped: {
      y: -1,
      scale: 0.99,
      transition: spring({ stiffness: 500, damping: 34 }),
    },
  }

  const action: MotionPreset = {
    initial: {
      scale: 1,
    },
    hovered: {
      y: -3,
      scale: 1.035,
      transition: spring({ stiffness: 500, damping: 27 }),
    },
    tapped: {
      y: 0,
      scale: 0.955,
      transition: spring({ stiffness: 620, damping: 36 }),
    },
  }

  const railItem: MotionPreset = {
    initial: {
      scale: 1,
    },
    hovered: {
      scale: 1.16,
      transition: spring({ stiffness: 520, damping: 30 }),
    },
    tapped: {
      scale: 0.9,
      transition: spring({ stiffness: 620, damping: 36 }),
    },
  }

  return {
    action,
    card,
    heading,
    page,
    railItem,
    section,
    subtleCard,
  }
}
