'use client';
import Image from 'next/image';
import styles from "./partners.module.css";
export function Partners() {
  const partners:{img:string,width: number,height:number}[] = [
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
      img:"vietcombank.png",
      width: 190,
      height: 65
    },
    {
      img:"nama.png",
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
    <div className="max-w-[1582px] m-auto">
      <h2 className="text-[42px] text-gray-1 font-bold text-center pt-[90px] mb-[51px]">ĐỐI TÁC</h2>
      <div className={`grid gap-8 items-center ${styles.carouselonlycss}`}>
        <div className={`${styles.groupcarousel}`}>
          {partners.map((partner:{img:string,width: number,height:number}, index) => (
            <div key={index + "c1"} className="flex-1">
              <div className={`h-[77px] ${styles.cardcarousel}`}>
                <Image
                  src={`/${partner.img}`}
                  alt="Partner logo"
                  width={`${partner.width}`}
                  height={`${partner.height}`}
                  className={`grayscale-[100%] hover:grayscale-0`}
                  style={{objectFit: "contain"}}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.groupcarousel}`}>
          {partners.map((partner:{img:string,width: number,height:number}, index) => (
            <div key={index + "c2"} className="flex-1">
              <div className={`h-[77px] ${styles.cardcarousel}`}>
                <Image
                  src={`/${partner.img}`}
                  alt="Partner logo"
                  width={`${partner.width}`}
                  height={`${partner.height}`}
                  className={`grayscale-[100%] hover:grayscale-0`}
                  style={{objectFit: "contain"}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}