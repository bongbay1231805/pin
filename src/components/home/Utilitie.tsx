'use client';
import Image from 'next/image'
import { forwardRef } from 'react';
const Utilitie = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <>
      <div className="container mx-auto md:mt-[5px] max-w-[1755px]" ref={ref}>
        <div className="relative">
          <div className="inset-0">
            <Image
              src="/fhome/utilitie.png"
              alt="Modern city skyline"
              width={1580}
              height={1110}
              className="m-auto"
            />
          </div>
        </div>
      </div>
    </>
  )
})
export default Utilitie;
Utilitie.displayName = 'Utilitie';