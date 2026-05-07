import type { MotionVariants, Transition } from '@vueuse/motion'

type MotionPreset = MotionVariants<never>

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

const spring = (overrides: Partial<Transition> = {}): Transition => ({
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.8,
  ...overrides,
})

const tween = (duration = 0.34, delay = 0): Transition => ({
  type: 'tween',
  duration,
  delay,
  ease: easeOut,
})

const reveal = (y = 18, delay = 0): MotionPreset => ({
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
      y: 10,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: tween(0.32),
    },
  }

  const section = reveal(24)
  const heading = reveal(16, 0.04)

  const card: MotionPreset = {
    ...reveal(18),
    hovered: {
      y: -5,
      scale: 1.01,
      transition: spring({ stiffness: 360, damping: 28 }),
    },
    tapped: {
      y: -1,
      scale: 0.992,
      transition: spring({ stiffness: 420, damping: 32 }),
    },
  }

  const subtleCard: MotionPreset = {
    ...reveal(12),
    hovered: {
      y: -3,
      scale: 1.006,
      transition: spring({ stiffness: 340, damping: 30 }),
    },
    tapped: {
      scale: 0.994,
      transition: spring({ stiffness: 420, damping: 34 }),
    },
  }

  const action: MotionPreset = {
    initial: {
      scale: 1,
    },
    hovered: {
      y: -2,
      scale: 1.025,
      transition: spring({ stiffness: 420, damping: 28 }),
    },
    tapped: {
      y: 0,
      scale: 0.97,
      transition: spring({ stiffness: 520, damping: 34 }),
    },
  }

  const railItem: MotionPreset = {
    initial: {
      scale: 1,
    },
    hovered: {
      scale: 1.08,
      transition: spring({ stiffness: 420, damping: 30 }),
    },
    tapped: {
      scale: 0.92,
      transition: spring({ stiffness: 520, damping: 34 }),
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
