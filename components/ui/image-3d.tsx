'use client'

import { useRef, useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface Image3DProps extends Omit<ImageProps, 'className'> {
  className?: string
  containerClassName?: string
}

export default function Image3D({ className, containerClassName, ...imageProps }: Image3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15
    
    containerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.08, 1.08, 1.08)`
  }

  const handleMouseLeave = () => {
    if (!containerRef.current) return
    setIsHovered(false)
    containerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn(
        'transition-transform duration-300 ease-out',
        containerClassName
      )}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-lg shadow-2xl transition-all duration-300',
          isHovered && 'shadow-purple-500/50 shadow-2xl',
          className
        )}
        style={{
          transform: 'translateZ(20px)',
        }}
      >
        <Image
          {...imageProps}
          className={cn('transition-all duration-300', imageProps.alt && '')}
        />
        {isHovered && (
          <div
            className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 pointer-events-none transition-opacity duration-300"
            style={{
              transform: 'translateZ(30px)',
            }}
          />
        )}
      </div>
    </div>
  )
}

