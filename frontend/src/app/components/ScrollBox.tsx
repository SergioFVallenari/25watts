import React, { useEffect, useRef, useState } from 'react'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
type ScrollBoxProps = {
  children: React.ReactNode
  reduction?: number;
}
const ScrollBox: React.FC<ScrollBoxProps> = ({ children, reduction = 1 }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const psRef = useRef<PerfectScrollbar | null>(null)
  const [deviceHeight, setDeviceHeight] = useState<number>(window.innerHeight)
  useEffect(() => {
    const handleResize = () => {
      setDeviceHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  useEffect(() => {
    if (scrollRef.current) {
      psRef.current = new PerfectScrollbar(scrollRef.current)
      return () => {
        psRef.current?.destroy()
        psRef.current = null
      }
    }
  }, [])
  return (
    <div
      ref={scrollRef}
      style={{
        maxHeight: `${deviceHeight * (reduction || 1)}px`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {children}
    </div>
  )
}
export default ScrollBox
