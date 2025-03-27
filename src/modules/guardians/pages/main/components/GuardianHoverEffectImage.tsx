import { Image } from '@chakra-ui/react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'

import { GuardianType } from '@/types/index.ts'

type ShinyImageProps = React.ComponentProps<typeof Image> & {
  guardian: GuardianType
}

type GradientColors = {
  [key in GuardianType]: { primary: string; secondary: string }
}

const guardianGradientColors: GradientColors = {
  /** This is the default one with holographic effect */
  [GuardianType.Warrior]: {
    primary: '120, 220, 255',
    secondary: '154, 71, 255',
  },
  [GuardianType.Knight]: {
    primary: '191, 140, 189',
    secondary: '82, 49, 103',
  },
  [GuardianType.King]: {
    primary: '254, 199, 21',
    secondary: '206, 77, 32',
  },
  [GuardianType.Legend]: {
    primary: '24, 180, 160',
    secondary: '13, 124, 109',
  },
}

/** GuardianHoverEffectImage component that creates a 3D-like effect with shine on hover */
export const GuardianHoverEffectImage = ({ guardian, ...props }: ShinyImageProps) => {
  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Track last positions (to freeze position on mouse leave)
  const lastX = useMotionValue(0)
  const lastY = useMotionValue(0)

  // Active position values (either current or last position)
  const activeX = useMotionValue(0)
  const activeY = useMotionValue(0)

  // Add spring physics to active position for smoother gradient movement
  const springActiveX = useSpring(activeX, { stiffness: 80, damping: 25 })
  const springActiveY = useSpring(activeY, { stiffness: 80, damping: 25 })

  // Track hover state
  const isHovering = useMotionValue(0)

  // Use spring animation for opacity to create smooth fade in/out transitions
  const hoverOpacity = useSpring(isHovering, {
    stiffness: 100,
    damping: 15,
    restDelta: 0.001,
  })

  // Transform mouse position to rotation
  // Increased rotation range for more dramatic effect
  const rotateX = useTransform(mouseY, [-300, 300], [30, -30])
  const rotateY = useTransform(mouseX, [-300, 300], [-30, 30])

  // Add spring physics for smoother animation
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  // Calculate distance from center for shine intensity - using springActiveX/Y for smoother movement
  const mouseMoveX = useTransform(springActiveX, [-300, 0, 300], [-1, 0, 1])
  const mouseMoveY = useTransform(springActiveY, [-300, 0, 300], [-1, 0, 1])

  // Calculate position for the shine effect - inverting the position to appear on the opposite side
  const shinePosX = useTransform(mouseMoveX, [-1, 0, 1], ['120%', '50%', '-20%']) // Extended range beyond 0-100%
  const shinePosY = useTransform(mouseMoveY, [-1, 0, 1], ['120%', '50%', '-20%']) // Extended range beyond 0-100%

  // Distance from center affects the shine intensity
  const distanceFromCenter = useTransform([mouseMoveX, mouseMoveY], ([latestX, latestY]) => {
    // Use as-is type assertion to resolve type issues
    const x = latestX as number
    const y = latestY as number
    return Math.sqrt(x * x + y * y)
  })

  // Shine opacity is highest at edges, lowest at center - increased range for more visibility
  const shineIntensity = useTransform(distanceFromCenter, [0, 0.5, 1], [0.1, 0.6, 1.0])

  // Create the shine gradient template - made more concentrated and brighter
  const shineGradient = useMotionTemplate`radial-gradient(
      circle at ${shinePosX} ${shinePosY},
      rgba(255, 255, 255, ${useTransform(shineIntensity, [0.1, 0.6, 1.0], [0.02, 0.15, 0.3])}) 0%,
      rgba(255, 255, 255, 0.1) 20%,
      rgba(255, 255, 255, 0) 35%
    )`

  const gradientColors = guardianGradientColors[guardian]

  // Create a subtle holographic color tint that follows the shine position
  const colorTintGradient = useMotionTemplate`radial-gradient(
      circle at ${shinePosX} ${shinePosY},
      rgba(${gradientColors.primary}, ${useTransform(shineIntensity, [0.1, 0.6, 0.6], [0.2, 0.4, 0.6])}) 0%,
      rgba(${gradientColors.secondary}, ${useTransform(shineIntensity, [0.1, 0.6, 0.3], [0.1, 0.2, 0.3])}) 25%,
      rgba(0, 0, 0, 0) 50%
    )`

  // Handle mouse move to update motion values
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate position relative to center
    const newX = event.clientX - rect.left - centerX
    const newY = event.clientY - rect.top - centerY

    // Update current mouse position
    mouseX.set(newX)
    mouseY.set(newY)

    // Update active position for shine
    activeX.set(newX)
    activeY.set(newY)

    // Store last known good position
    lastX.set(newX)
    lastY.set(newY)
  }

  // Handle mouse enter
  const handleMouseEnter = () => {
    isHovering.set(1)
  }

  // Reset motion values when mouse leaves
  const handleMouseLeave = () => {
    // Immediately set hover to 0 to hide the effect
    isHovering.set(0)

    // Reset card rotation (mouseX/Y are used for rotation)
    mouseX.set(0)
    mouseY.set(0)

    // We DON'T change activeX/Y here, so shine stays in the same position while disappearing
  }

  return (
    <motion.div
      style={{
        perspective: 800,
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <Image {...props} boxShadow={'0px 0px 10px 0px rgba(0, 0, 0, 0.5)'} />

        {/* Holographic color tint overlay */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: colorTintGradient,
            opacity: hoverOpacity,
            mixBlendMode: 'color-burn',
            filter: 'saturate(1.8)',
            pointerEvents: 'none',
          }}
        />

        {/* Shine effect overlay */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: shineGradient,
            opacity: hoverOpacity,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </motion.div>
  )
}
