'use client'
import React, { useRef } from 'react'
const HorizontalScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  let isDown = false
  let startX = 0
  let scrollLeft = 0
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    isDown = true
    scrollRef.current.classList.add('cursor-grabbing')
    startX = e.pageX - scrollRef.current.offsetLeft
    scrollLeft = scrollRef.current.scrollLeft
  }
  const onMouseLeave = () => {
    isDown = false
    scrollRef.current?.classList.remove('cursor-grabbing')
  }
  const onMouseUp = () => {
    isDown = false
    scrollRef.current?.classList.remove('cursor-grabbing')
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // tốc độ kéo
    scrollRef.current.scrollLeft = scrollLeft - walk
  }
  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto scrollbar-hide cursor-grab select-none"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <div className="flex gap-[40px] h-[222px] px-6">
        {[
          'Camera AI & Face ID giám sát an ninh',
          'Smarthome điều khiển thiết bị từ xa',
          'Cảnh báo cháy thông minh',
          'Gian hàng mua sắm trực tuyến',
          'Camera AI & Face ID giám sát an ninh',
          'Smarthome điều khiển thiết bị từ xa',
          'Cảnh báo cháy thông minh',
          'Gian hàng mua sắm trực tuyến'
        ].map((text, i) => (
          <div
            key={i}
            className="grid items-center bg-blue-1 rounded-[20px] min-w-[250px] w-[250px] h-full content-evenly hover:bg-yellow-1 duration-500"
          >
            <h4 className="uppercase text-white text-[14px] text-center font-bold">
              {text}
            </h4>
          </div>
        ))}
      </div>
    </div>
  )
}
export default HorizontalScroll
