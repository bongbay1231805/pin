'use client';
import Image from 'next/image';
import {forwardRef} from 'react';
import {useScrollReveal} from '@/hooks/useScrollReveal';
const Utilitie = forwardRef<HTMLDivElement>((props, ref) => {
  useScrollReveal(); // dùng mặc định `.boxanimation`
  return (
    <>
      <div className="boxanimation mx-auto mt-[5px] max-w-[85%]" ref={ref}>
        <div className="relative">
          <div className="inset-0">
            <Image
              src="/fhome/utilitie.png"
              alt="Modern city skyline"
              width={1580}
              height={1110}
              className="m-auto fade-in-up-medium w-full h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
});
export default Utilitie;
Utilitie.displayName = 'Utilitie';

