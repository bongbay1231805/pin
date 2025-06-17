'use client';
import Image from 'next/image';
import styles from "./partners.module.css";
export function Partners({ custom_fields }: any) {
  const {field_19,field_19_add} = custom_fields || {};
  const partners: { img: string, width: number, height: number }[] = [
    {
      img: "hyundai.png",
      width: 130,
      height: 77
    },
    {
      img: "decori.png",
      width: 190,
      height: 55
    },
    {
      img: "vietcombank.png",
      width: 190,
      height: 65
    },
    {
      img: "nama.png",
      width: 190,
      height: 77
    },
    {
      img: "hyundai.png",
      width: 130,
      height: 77
    }
  ]
  return (
    <div className='mb-[50px] 2xl:mb-[96px]'>
      <div className="m-auto w-full px-[30px] sm:max-w-[85%]">
        <h2 className="text-[30px] 2xl:text-[42px] text-gray-1 font-bold text-center pt-[50px] sm:pt-[82px] mb-[51px] uppercase">{field_19||field_19_add}</h2>
        <div className={`grid gap-8 items-center ${styles.carouselonlycss}`}>
          <div className={`${styles.groupcarousel}`}>
            {partners.map((partner: { img: string, width: number, height: number }, index) => (
              <div key={index + "c1"} className="flex-1">
                <div className={`h-[52px] 2xl:h-[60px] w-[160px] ml-[20px] mr-[20px] text-center ${styles.cardcarousel}`}>
                  <Image
                    src={`/${partner.img}`}
                    alt="Partner logo"
                    width={`${partner.width}`}
                    height={`${partner.height}`}
                    className={`grayscale-[100%] opacity-75 hover:grayscale-0 hover:opacity-100`}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles.groupcarousel}`}>
            {partners.map((partner: { img: string, width: number, height: number }, index) => (
              <div key={index + "c2"} className="flex-1">
                <div className={`h-[52px] 2xl:h-[60px] w-[160px] ml-[20px] mr-[20px] text-center ${styles.cardcarousel}`}>
                  <Image
                    src={`/${partner.img}`}
                    alt="Partner logo"
                    width={`${partner.width}`}
                    height={`${partner.height}`}
                    className={`grayscale-[100%] opacity-75 hover:grayscale-0 hover:opacity-100`}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}