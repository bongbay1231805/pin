'use client'
import convertJsonStringToArrayOrObject from '@/hooks/useConvertJsonToArray';
import React, { useRef } from 'react'
type HorizontalScrollProps = {
  custom_fields: any;
};
const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ custom_fields }: any) => {
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
  const { digitalcity_slider_horizoltal } = custom_fields;
  const digitalcitysliderhorizoltal = convertJsonStringToArrayOrObject(digitalcity_slider_horizoltal);
  const digitalcitysliderhorizoltals = [...digitalcitysliderhorizoltal,...digitalcitysliderhorizoltal];
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
        {digitalcitysliderhorizoltals.map((text:any, i:number) => (
          <div
            key={i}
            className="grid items-center bg-blue-1 rounded-[20px] min-w-[250px] w-[250px] h-full content-evenly hover:bg-yellow-1 duration-500"
          >
            <div className='grid justify-center items-center' dangerouslySetInnerHTML={{__html: text[0].value}}></div>
            <h4 className="uppercase text-white text-[14px] text-center font-bold">
              {text[1].value}
            </h4>
          </div>
        ))}
      </div>
    </div>
  )
}
export default HorizontalScroll
