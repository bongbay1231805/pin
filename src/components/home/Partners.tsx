'use client';
import Image from 'next/image';
import styles from './partners.module.css';

type PartnerImage = {
  img: string;
  width: number;
  height: number;
};

const imageSizeMap: Record<string, {width: number; height: number}> = {
  'hyundai.png': {width: 84, height: 77},
  'decori.png': {width: 172, height: 55},
  'vietcombank.png': {width: 146, height: 50},
  'logo_nam_a_bank.png': {width: 140, height: 50},
  'ong.png': {width: 190, height: 25},
  'ht.png': {width: 100, height: 95},
  'ariston.png': {width: 190, height: 50},
  'bosch.png': {width: 190, height: 43},
  'ferroli.png': {width: 100, height: 50},
  'lg.png': {width: 109, height: 50},
  'malloca.png': {width: 190, height: 49},
  'otis_v2.png': {width: 153, height: 50},
  'UKDSGN.png': {width: 252, height: 50}
};

export function Partners({
  title,
  logoDataRaw
}: {
  title: string;
  logoDataRaw: string;
}) {
  const logoData = JSON.parse(logoDataRaw || '[]');

  const partners: PartnerImage[] =
    logoData
      ?.map((group: any[]) => {
        const imageField = group.find((item) => item.slug === 'image');
        if (!imageField || !imageField.value) return null;

        const fileName = imageField.value;
        const size = imageSizeMap[fileName] || {width: 100, height: 50};

        return {
          img: `https://admin.pigroup.vn/storage/${fileName}`,
          ...size
        };
      })
      .filter(Boolean) || [];

  return (
    <div className="mb-[50px] 2xl:mb-[96px]">
      <div className="m-auto w-full px-[30px] sm:max-w-[85%]">
        <h2 className="text-[22px] sm:text-[28px] 2xl:text-[45px] text-gray-1 font-bold text-center pt-[50px] sm:pt-[82px] mb-[51px] uppercase">
          {title}
        </h2>
        <div className={`grid gap-8 items-center ${styles.carouselonlycss}`}>
          {[...Array(2)].map((_, idx) => (
            <div className={styles.groupcarousel} key={`row${idx}`}>
              {partners.map((partner, index) => (
                <div key={index + '-carousel'} className="flex-1">
                  <div
                    className={`h-[52px] 2xl:h-[60px] w-[160px] ml-[20px] mr-[20px] flex items-end justify-center ${styles.cardcarousel}`}
                  >
                    <Image
                      src={partner.img}
                      alt="Partner logo"
                      width={partner.width}
                      height={partner.height}
                      className="sm:grayscale-[100%] opacity-75 hover:grayscale-0 hover:opacity-100"
                      style={{objectFit: 'contain'}}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
