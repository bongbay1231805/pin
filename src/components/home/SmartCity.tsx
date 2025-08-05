'use client';
import { routeLocales } from '@/routes';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState, useRef} from 'react';
import TienIchSvg from './TienIchSvg';
import CongNgheSvg from './CongNgheSvg';
import VanHanhSvg from './VanHanhSvg';

type ChildClass = 'child1' | 'child2' | 'child3';
export function SmartCity({custom_fields}: any) {
  const currentLocale = useLocale();
  
  // `currentRotation` sẽ lưu trữ tổng số độ xoay hiện tại của phần tử
  const [currentRotation, setCurrentRotation] = useState<number>(0);
  // `activeChild` để theo dõi child nào đang được active
  const [activeChild, setActiveChild] = useState<ChildClass | null>('child1');
  // Định nghĩa các góc "mục tiêu" tương ứng với mỗi child nếu chúng bắt đầu từ 0deg

  // MỚI: Thêm state để kiểm soát trạng thái tạm dừng khi hover
  const [isPaused, setIsPaused] = useState(false);
  // MỚI: Dùng useRef để lưu trữ ID của interval
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const targetDegrees: {[key in ChildClass]: number} = {
    child1: 0,
    child2: 120,
    child3: 240
  };
  const handleChildClick = (childClass: ChildClass) => {
    // Tạm dừng việc tự động xoay khi người dùng tương tác
    setIsPaused(true);

    // 1. Lấy góc mục tiêu cho child được click
    const desiredOffset = targetDegrees[childClass];
    // 2. Tính toán góc xoay mới
    // Chúng ta cần một giá trị `newRotation` sao cho `newRotation % 360`
    // gần nhất với `desiredOffset`, nhưng lớn hơn hoặc bằng `currentRotation`.
    let newRotation = currentRotation;
    // Lặp để tìm góc xoay hợp lệ theo chiều kim đồng hồ
    // Mỗi vòng lặp 360 độ sẽ đưa phần tử về cùng một vị trí hiển thị,
    // nhưng tổng số độ xoay sẽ tăng lên.
    while (newRotation % 360 !== desiredOffset) {
      // Nếu newRotation % 360 chưa phải là desiredOffset,
      // chúng ta sẽ điều chỉnh newRotation.
      // Cách đơn giản nhất để đảm bảo quay cùng chiều:
      // Nếu desiredOffset (tức là vị trí tuyệt đối) < currentRotation (vị trí hiện tại),
      // thì chúng ta đã "đi qua" desiredOffset trong chu kỳ 360 độ hiện tại.
      // Do đó, chúng ta cần thêm 360 độ để đến desiredOffset ở chu kỳ tiếp theo.
      const currentMod360 = ((newRotation % 360) + 360) % 360; // Đảm bảo giá trị dương
      if (desiredOffset >= currentMod360) {
        // Nếu góc mục tiêu lớn hơn hoặc bằng góc hiện tại (trong chu kỳ 360),
        // chỉ cần thêm phần chênh lệch
        newRotation += desiredOffset - currentMod360;
      } else {
        // Nếu góc mục tiêu nhỏ hơn góc hiện tại,
        // chúng ta cần xoay một vòng 360 độ để đến vị trí đó
        newRotation += 360 - currentMod360 + desiredOffset;
      }
      // Để tránh vòng lặp vô hạn nếu có lỗi logic, có thể thêm điều kiện dừng
      if (newRotation >= currentRotation + 720) {
        // Giới hạn xoay tối đa 2 vòng
        newRotation = currentRotation + (desiredOffset - currentMod360); // Quay về cách cơ bản nếu quá phức tạp
        break;
      }
    }
    // Một cách đơn giản hơn để xử lý vòng lặp:
    // Tính toán góc đích "thực tế" gần nhất và lớn hơn góc hiện tại.
    const currentAngleNormalized = ((currentRotation % 360) + 360) % 360;
    let targetAngle = targetDegrees[childClass];
    // Nếu góc mục tiêu nhỏ hơn góc hiện tại, và chúng ta muốn xoay theo chiều kim đồng hồ,
    // chúng ta cần thêm 360 độ để "vượt qua" 0deg và tiếp tục xoay
    if (targetAngle < currentAngleNormalized) {
      targetAngle += 360;
    }
    // Nếu targetAngle vẫn nhỏ hơn currentRotation, điều này xảy ra khi
    // currentRotation đã vượt qua nhiều vòng 360 độ.
    // Chúng ta cần đảm bảo rằng targetAngle luôn lớn hơn hoặc bằng currentRotation.
    // Điều này sẽ xử lý trường hợp khi bạn click liên tục và currentRotation tăng lên.
    while (targetAngle < currentRotation) {
      targetAngle += 360;
    }
    setCurrentRotation(targetAngle); // Cập nhật tổng số độ xoay
    setActiveChild(childClass);
  };
  const getNextRotation = (
    currentDeg: number,
    desiredOffset: number
  ): number => {
    const currentAngleNormalized = ((currentDeg % 360) + 360) % 360;
    let targetAngle = desiredOffset;
    if (targetAngle < currentAngleNormalized) {
      targetAngle += 360;
    }
    while (targetAngle < currentDeg) {
      targetAngle += 360;
    }
    return targetAngle;
  };
  useEffect(() => {
    // Nếu đang tạm dừng, ta sẽ dọn dẹp interval và không làm gì cả
    if (isPaused) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      return;
    }

    const childrenOrder: ChildClass[] = ['child1', 'child2', 'child3'];
    // Xác định index hiện tại dựa trên activeChild để đồng bộ sau khi click
    const currentActiveIndex = activeChild
      ? childrenOrder.indexOf(activeChild)
      : -1;
    let currentIndex = currentActiveIndex;

    intervalIdRef.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % childrenOrder.length;
      const nextChild = childrenOrder[currentIndex];

      setCurrentRotation((prevRotation) =>
        getNextRotation(prevRotation, targetDegrees[nextChild])
      );
      setActiveChild(nextChild);
    }, 2000);
    // Hàm cleanup: quan trọng để xóa interval khi component unmount
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isPaused]); // THAY ĐỔI: useEffect sẽ chạy lại khi trạng thái `isPaused` thay đổi
  const {field_6, field_7, field_8, field_9, field_10} = custom_fields || {};
  return (
    <>
      <section className="@container relative boxanimation fade-in-up-medium">
        <svg
          className="border-circle-right hidden md:block absolute top-[-10%] 2xl:top-[-100px] right-0 translate-x-[50%] overflow-x-hidden max-w-[25%] h-auto"
          width="528.46"
          height="523.07"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 528.46 523.07"
        >
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="197.13"
            cy="257.42"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="202.49"
            cy="360.51"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="223.34"
            cy="202.17"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="258.28"
            cy="166.55"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="200.32"
            cy="206.37"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="171.64"
            cy="226.48"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="183.96"
            cy="267.14"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="139.68"
            cy="239.82"
            r="2.1"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M184.48,269.26l-1-.04c.06-1.32.16-2.7.31-4.2,2.5-25.35,16.15-48.04,37.43-62.24,1.08-.73,2.25-1.47,3.56-2.25l.51.86c-1.3.78-2.45,1.51-3.52,2.23-21.03,14.03-34.52,36.45-36.99,61.5-.15,1.48-.25,2.84-.31,4.14Z"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M199.71,207.83c-.23.25-.58.3-.79.11s-.18-.54.04-.78c0,0,1.45-1.57,2.48-2.61,17.81-18.03,41.57-27.96,66.91-27.96,22.84,0,44.87,8.29,62.02,23.33,1.18,1.05,2.65,2.44,2.65,2.44.24.23.29.58.09.78s-.55.17-.79-.06c0,0-1.45-1.37-2.62-2.41-16.97-14.89-38.76-23.08-61.36-23.08-25.07,0-48.58,9.82-66.19,27.66-1.02,1.03-2.45,2.58-2.45,2.58Z"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M171.19,228.46l-.91-.42c.66-1.41,1.27-2.64,1.86-3.76,16.67-32.16,48.05-53.78,83.94-57.81,1.33-.16,2.69-.3,4.16-.4l.07,1c-1.45.1-2.8.23-4.11.4-35.56,4-66.65,25.42-83.17,57.28-.58,1.11-1.19,2.32-1.84,3.72Z"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M166.65,355.81c-.95-1.13-1.82-2.2-2.65-3.26-18.51-23.55-28.3-51.87-28.3-81.9,0-9.62,1.04-19.24,3.08-28.57.32-1.46.64-2.8.97-4.1l.97.25c-.33,1.28-.65,2.61-.97,4.06-2.03,9.26-3.06,18.8-3.06,28.35,0,29.8,9.71,57.9,28.08,81.28.83,1.06,1.69,2.12,2.63,3.24l-.77.64Z"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M268.35,417.18c-29.69,0-58.18-8.98-82.4-25.96-23.68-16.61-41.63-39.61-51.89-66.52-.49-1.31-.97-2.62-1.43-3.95l.94-.33c.46,1.32.94,2.62,1.43,3.92,10.2,26.72,28.01,49.56,51.53,66.06,24.05,16.87,52.35,25.78,81.83,25.78,33.44,0,65.95-11.8,91.54-33.23,1.08-.9,2.13-1.8,3.18-2.73l.66.75c-1.05.93-2.12,1.85-3.2,2.75-25.77,21.58-58.5,33.47-92.18,33.47Z"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M268.43,442.31c-93.09,0-168.82-75.73-168.82-168.82,0-57.78,29.07-110.94,77.76-142.19,1.17-.75,2.37-1.49,3.57-2.23l.52.85c-1.2.73-2.38,1.47-3.55,2.21-48.4,31.07-77.3,83.91-77.3,141.35,0,92.54,75.28,167.82,167.82,167.82,9.17,0,18.34-.74,27.24-2.2,1.5-.24,2.84-.48,4.11-.73l.19.98c-1.29.25-2.64.49-4.15.73-8.96,1.47-18.17,2.22-27.4,2.22Z"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M55.39,399.16c-.73-1.19-1.45-2.4-2.15-3.61-23.83-40.93-35.37-87.7-33.39-135.25,1.81-43.58,15.04-85.97,38.25-122.6,22.52-35.54,53.92-65.02,90.82-85.26,1.23-.68,2.48-1.34,3.72-1.99l.46.89c-1.24.65-2.47,1.31-3.7,1.98-36.75,20.16-68.03,49.52-90.46,84.92-23.11,36.48-36.29,78.7-38.09,122.11-1.98,47.36,9.52,93.94,33.25,134.71.7,1.21,1.41,2.4,2.13,3.59l-.85.52Z"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="165.79"
            cy="353.8"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="133.81"
            cy="322.55"
            r="2.1"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M340.8,258.31h0c-.03-.25-.23-.45-.49-.45-.28,0-.5.23-.5.5,0,.05.01.09.03.14h0c.94,4.74,1.42,9.58,1.42,14.39,0,40.08-32.61,72.7-72.7,72.7s-72.69-32.61-72.69-72.7c0-4.66.44-9.32,1.32-13.85l-.98-.19c-.89,4.59-1.34,9.32-1.34,14.04,0,40.64,33.06,73.7,73.69,73.7s73.7-33.06,73.7-73.7c0-4.88-.49-9.79-1.44-14.58Z"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="131.13"
            cy="232.21"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="363.38"
            cy="380.61"
            r=".5"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M393.8,203.37h0c-.63-1.14-1.32-2.33-2.11-3.63-12.54-20.93-30.33-38.45-51.44-50.68-21.75-12.6-46.62-19.26-71.9-19.26-31.14,0-60.77,9.8-85.69,28.33-24.43,18.18-42.18,43.05-51.32,71.93-.42,1.33-.83,2.68-1.21,4.04l.96.27c.38-1.34.79-2.68,1.21-4,9.08-28.68,26.7-53.38,50.96-71.43,24.74-18.4,54.16-28.13,85.09-28.13,25.11,0,49.8,6.61,71.4,19.12,20.96,12.14,38.62,29.54,51.08,50.33.78,1.3,1.46,2.48,2.09,3.61h0c.09.15.24.26.43.26.28,0,.5-.23.5-.5,0-.09-.03-.17-.07-.24Z"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="179.37"
            cy="130.51"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="299.81"
            cy="438.88"
            r=".5"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="95.46"
            cy="227.68"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="105.54"
            cy="347.3"
            r="2.1"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M447.95,287.69c0-.28-.23-.5-.5-.5-.26,0-.46.19-.49.44h0c-.13,1.39-.28,2.77-.44,4.16-5.27,44.8-27.1,85.68-61.48,115.13-34.56,29.6-78.63,44.87-124.13,42.97-66.05-2.76-125.05-41.43-153.97-100.92-.61-1.26-1.21-2.52-1.79-3.79l-.91.42c.58,1.27,1.18,2.55,1.8,3.81,29.08,59.82,88.41,98.71,154.83,101.48,2.54.11,5.07.16,7.6.16,43.03,0,84.4-15.25,117.23-43.36,34.57-29.61,56.53-70.73,61.83-115.78.16-1.39.31-2.79.44-4.18h0s0-.02,0-.03Z"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M377.06,243.61c-.36-1.45-.72-2.78-1.09-4.06-.07-.19-.25-.32-.47-.32-.28,0-.5.23-.5.5,0,.03.01.05.02.08h0c.37,1.28.73,2.59,1.08,4.03,2.53,10.21,3.6,20.77,3.16,31.41-2.48,59.58-51.74,106.37-110.84,106.37-1.55,0-3.11-.03-4.67-.1-21.39-.88-41.89-7.85-59.3-20.15-1.15-.8-2.28-1.63-3.37-2.48l-.61.79c1.1.85,2.25,1.7,3.41,2.5,17.56,12.41,38.25,19.44,59.83,20.33,1.59.07,3.18.1,4.77.1,28.15,0,54.88-10.4,75.71-29.58,22.01-20.25,34.82-47.87,36.07-77.75.44-10.73-.63-21.39-3.18-31.69Z"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="206.19"
            cy="466.24"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="214.15"
            cy="480.97"
            r="2.1"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M395.17,148.01h0s-.03-.04-.04-.05c0,0-.01-.01-.02-.02-.98-.97-1.96-1.93-2.96-2.87-31.51-29.95-72.82-47.44-116.31-49.26-41.06-1.71-80.28,10.17-113.4,34.36-32.15,23.47-55.88,57.34-66.84,95.37-.38,1.34-.76,2.7-1.11,4.06l.97.25c.35-1.36.73-2.7,1.11-4.04,10.89-37.81,34.5-71.49,66.47-94.83,32.94-24.05,71.94-35.87,112.77-34.16,43.25,1.8,84.33,19.2,115.67,48.98.99.93,1.96,1.89,2.94,2.85.01.01.02.02.03.03.01.01.03.02.04.04h0c.08.05.18.1.29.1.28,0,.5-.23.5-.5,0-.11-.04-.21-.11-.29Z"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M294.2,54.81c0-.23-.16-.41-.36-.48h0s-.09-.02-.13-.03c0,0,0,0,0,0,0,0,0,0,0,0-1.34-.16-2.68-.31-4.03-.44-4.15-.4-8.27-.69-12.24-.85-58.12-2.41-113.73,17.94-156.54,57.33-42.82,39.39-67.73,93.1-70.16,151.23-2.07,49.71,13.1,99.04,42.72,138.9,29.19,39.28,71.15,67.87,118.14,80.51,1.34.36,2.7.71,4.06,1.04l.24-.97c-1.36-.33-2.7-.68-4.04-1.04-46.77-12.58-88.53-41.04-117.59-80.14-29.49-39.67-44.59-88.77-42.53-138.26,2.41-57.87,27.21-111.33,69.83-150.54,42.62-39.21,97.97-59.49,155.83-57.07,3.95.16,8.05.45,12.18.85,1.38.13,2.75.28,4.11.44,0,0,0,0,.01,0,0,0,0,0,0,0,0,0,0,0,.01,0h0c.27-.01.48-.23.48-.5Z"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M458.94,348.18c0-.28-.23-.5-.5-.5-.22,0-.4.14-.47.33-.52,1.29-1.06,2.57-1.61,3.85-16.25,37.61-43.16,69.21-77.82,91.38-35.45,22.67-76.48,33.73-118.7,31.97-17.54-.73-34.87-3.68-51.51-8.77-1.34-.41-2.66-.83-3.99-1.27l-.31.95c1.33.44,2.67.86,4.01,1.27,16.73,5.11,34.14,8.07,51.77,8.81,2.92.12,5.83.18,8.74.18,39.32,0,77.37-11.09,110.54-32.31,34.83-22.28,61.87-54.03,78.2-91.82.56-1.28,1.1-2.58,1.62-3.87.03-.06.05-.13.05-.21Z"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="218.25"
            cy="37.92"
            r="2.1"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M443.78,109.25c-43.11-46.86-101.89-74.12-165.51-76.77-19.45-.81-38.88.74-57.74,4.59-1.38.27-2.76.56-4.13.87l.22.98c1.36-.31,2.72-.6,4.1-.87,18.78-3.84,38.13-5.38,57.5-4.57,63.35,2.64,121.88,29.79,164.81,76.45,42.93,46.66,65.12,107.25,62.48,170.6-2.34,56.3-24.68,110.03-62.91,151.3-.91,1-1.85,1.99-2.79,2.98-.01,0-.02.02-.03.03-.01.01-.03.03-.04.04h0c-.06.09-.1.18-.1.29,0,.28.23.5.5.5.11,0,.22-.05.3-.11h0s.02-.02.04-.03c0,0,.01-.02.02-.02.95-.99,1.9-2,2.82-3,38.39-41.45,60.82-95.41,63.17-151.94,2.65-63.62-19.63-124.46-62.74-171.32Z"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="54.71"
            cy="397.12"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="150.99"
            cy="51.82"
            r="2.1"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="74.46"
            cy="97.94"
            r="2.1"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M459.76,94.55c-47.04-51.13-111.17-80.87-180.58-83.76-77.16-3.21-151.29,27.75-203.33,84.95-.94,1.03-1.87,2.08-2.8,3.14l.75.66c.93-1.05,1.86-2.1,2.8-3.12C128.43,39.43,202.24,8.58,279.14,11.78c69.14,2.88,133.03,32.51,179.88,83.44,46.86,50.93,71.08,117.06,68.2,186.21-2.01,48.27-17.35,94.81-44.36,134.58-26.27,38.68-62.5,69.59-104.79,89.4-1.26.59-2.52,1.17-3.79,1.73-.19.07-.32.25-.32.47,0,.28.23.5.5.5.08,0,.15-.02.21-.05,1.28-.57,2.55-1.15,3.82-1.75,42.45-19.88,78.82-50.91,105.19-89.74,27.11-39.93,42.51-86.64,44.53-135.1,2.89-69.42-21.43-135.8-68.46-186.93Z"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="2.1"
            cy="225.84"
            r="2.1"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M289.44.82s0,0,0,0c-1.36-.1-2.73-.2-4.1-.28-1.89-.12-3.8-.22-5.71-.3-65.91-2.74-130.4,18.59-181.59,60.08C47.29,101.43,13.14,159.31,1.85,223.3c-.24,1.37-.47,2.76-.69,4.15l.99.16c.22-1.39.45-2.76.69-4.13,11.24-63.75,45.27-121.42,95.83-162.38C149.67,19.76,213.91-1.51,279.58,1.23c1.91.08,3.8.18,5.69.3,1.37.08,2.74.18,4.09.28h0s.05,0,.07,0c.28,0,.5-.23.5-.5s-.23-.5-.5-.5Z"
          />
          <circle
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            cx="183.67"
            cy="507.87"
            r="2.1"
          />
          <path
            className="cls-1 animate-half-circle origin-[50%_50%]!"
            d="M456.42,439.01c.06-.08.11-.18.11-.3,0-.28-.23-.5-.5-.5-.15,0-.28.07-.37.17-.92,1.04-1.85,2.06-2.79,3.08-50.2,54.17-121.25,83.47-194.97,80.4-24.48-1.02-48.52-5.54-71.46-13.43-1.25-.43-2.49-.87-3.74-1.32l-.2-.07-.16.45h0s0-.49,0-.49h-.34s-.25.63-.25.63l.24.24.38.19c1.25.45,2.5.89,3.75,1.32,23.03,7.93,47.17,12.47,71.74,13.49,3.53.15,7.05.22,10.57.22,70.19,0,137.18-29.15,185.18-80.94.93-1.01,1.86-2.02,2.77-3.05.01,0,.02-.02.03-.03,0-.01.02-.02.03-.03h0Z"
          />
        </svg>
        <div className="mx-auto mb-[42px] mt-[15px] max-w-[85%] boxanimation fade-in-up-medium">
          <div className="grid grid-cols-1 sm:grid-cols-[50%_50%] items-center">
            <div
              className="@container order-1 sm:order-0 relative  aspect-square items-center flex justify-center"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <svg
                className="absolute overflow-x-clip max-w-70 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  transform: `rotate(${currentRotation}deg)`,
                  transition: 'transform 1.5s ease'
                }}
                width="572"
                height="572"
                viewBox="0 0 572 572"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2002_1264)">
                  <path
                    fill={`${activeChild === 'child1' ? '#C48C5E' : activeChild === 'child2' ? '#3B5E8D' : '#304E76'} `}
                    // onClick={() => handleChildClick('child1')}
                    d="M499.256 173.664C498.89 178.39 496.732 182.699 493.178 185.912L493.177 185.913L492.826 186.218C489.172 189.312 484.599 190.872 479.849 190.623L416.274 187.218L416.272 187.218L415.833 187.184C411.309 186.787 406.929 184.695 403.848 181.353L403.849 181.353L403.196 180.672L403.192 180.667C384.811 160.297 361.244 145 334.975 136.392L333.217 135.829C258.739 112.459 179.39 147.293 144.968 214.945C144.676 215.518 144.403 216.103 144.126 216.696C143.85 217.288 143.569 217.89 143.263 218.492L143.04 218.93L142.818 218.493L114.321 162.411C107.375 148.746 90.7697 143.174 77.0686 149.716L76.4177 150.037L23.2469 177.054L22.5627 177.401L22.9276 176.684C25.6749 170.003 28.7005 163.465 31.945 157.088C95.6913 31.8012 238.833 -27.687 372.765 15.1642L374.34 15.6731C422.057 31.2161 464.825 59.0512 497.962 96.3445C501.097 99.8602 502.818 104.47 502.671 109.159L502.651 109.613L499.286 173.207L499.256 173.664Z"
                    stroke="#E5AE80"
                    strokeWidth="0.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    // onClick={() => handleChildClick('child2')}
                    fill={`${activeChild === 'child2' ? '#C48C5E' : '#3B5E8D'} `}
                    d="M322.194 569.479C280.534 574.89 237.878 570.908 197.529 557.759L197.528 557.758L195.834 557.199C124.218 533.336 66.0216 483.235 31.8051 415.896L31.7955 415.9C-2.74666 348.022 -8.70835 270.738 14.9116 198.365L14.9125 198.364C16.4642 193.716 19.6929 189.867 24.0873 187.627L24.0878 187.626L80.8511 158.775L80.8515 158.774C89.9427 154.197 101.064 157.822 105.702 166.893L105.702 166.894L134.514 223.637C136.733 227.971 137.123 233 135.591 237.71L135.591 237.711L134.988 239.594C122.582 279.199 126.105 321.31 144.944 358.404C163.784 395.498 195.745 423.205 235.056 436.536L236.934 437.159C256.751 443.586 277.613 446.088 298.164 444.476L298.67 444.436L298.393 444.861L264.115 497.543L264.112 497.548L263.899 497.866C263.41 498.613 262.976 499.392 262.571 500.188C259.768 505.697 258.875 511.944 260.042 518.104L260.162 518.699C261.736 526.064 266.031 532.376 272.344 536.482L322.298 569.021L322.867 569.392L322.194 569.479Z"
                    stroke="#8FFFFF"
                    strokeWidth="0.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    // onClick={() => handleChildClick('child3')}
                    fill={`${activeChild === 'child3' ? '#C48C5E' : '#304E76'} `}
                    d="M539.899 416.289C501.045 492.654 430.767 546.854 346.774 565.291L344.788 565.72L344.785 565.721L344.328 565.807C339.61 566.642 334.851 565.731 330.901 563.129L277.563 528.367C273.448 525.663 270.619 521.528 269.58 516.679L269.579 516.678C268.58 511.848 269.507 506.929 272.17 502.794L272.17 502.793L306.892 449.435L306.893 449.433C309.575 445.361 313.706 442.534 318.767 441.455L318.876 441.42L318.888 441.415L318.901 441.413C373.468 429.774 418.133 389.925 435.864 337.072L436.278 335.821C451.558 288.959 443.854 237.564 416.35 197.328L416.064 196.909L416.57 196.936L479.364 200.296C486.638 200.674 493.632 198.296 499.157 193.553L499.688 193.086C505.176 188.171 508.442 181.567 508.995 174.334L509.04 173.632L512.197 114.094L512.233 113.414L512.646 113.956C568.917 187.97 586.058 286.002 556.938 375.106L556.062 377.76C551.615 391.01 546.177 403.951 539.899 416.289Z"
                    stroke="#00B8FA"
                    strokeWidth="0.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M317.635 436.664L317.615 436.704L317.634 436.764L317.635 436.664Z"
                    fill="url(#paint0_linear_2002_1264)"
                  />


                  <TienIchSvg />
                  <CongNgheSvg />
                  <VanHanhSvg />
                  
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_2002_1264"
                    x1="511.086"
                    y1="56.456"
                    x2="305.149"
                    y2="461.204"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#CCFF82" />
                    <stop offset="1" stopColor="#009685" />
                  </linearGradient>
                  <clipPath id="clip0_2002_1264">
                    <rect
                      width="572"
                      height="572"
                      fill="white"
                      transform="translate(0.00585938 0.00488281)"
                    />
                  </clipPath>
                  <clipPath id="clip1_2002_1264">
                    <rect
                      width="114.78"
                      height="372.159"
                      fill="white"
                      transform="translate(-7.19043 220.937) rotate(-22.8133)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                className="absolute overflow-x-clip max-w-70 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                width="572"
                height="572"
                viewBox="0 0 572 572"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  className={`${activeChild === 'child1' ? 'opacity-100' : 'opacity-0'}`}
                >
                  <path
                    d="M305.118 332.863L305.118 317.747"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M305.118 317.748L305.118 311.199L300.453 306.565"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M300.45 306.565L298.37 304.499"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M297.056 305.803L299.682 303.194L297.596 301.123L294.97 303.731L297.056 305.803Z"
                    fill="#C48C5E"
                  />
                  <path
                    d="M289.304 295.475C286.73 298.031 286.671 302.129 289.174 304.615C291.678 307.101 295.803 307.043 298.377 304.487C300.95 301.93 301.009 297.833 298.506 295.347C296.003 292.86 291.878 292.919 289.304 295.475ZM291.854 298.02C292.982 296.899 294.78 296.876 295.885 297.961C296.99 299.047 296.955 300.845 295.826 301.965C294.698 303.086 292.9 303.109 291.795 302.024C290.702 300.938 290.726 299.14 291.854 298.02Z"
                    fill="#C48C5E"
                  />
                  <path
                    d="M284.38 337.464L284.38 323.958"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M284.38 323.957L284.38 317.397L277.787 317.397"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M277.786 317.397L274.789 317.397"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M274.79 317.396L271.781 317.396"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M271.779 317.397L268.782 317.397"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M268.784 317.396L265.787 317.396"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M262.79 319.242L265.787 319.242L265.787 315.554L262.79 315.554L262.79 319.242Z"
                    fill="#C48C5E"
                  />
                  <path
                    d="M252.703 317.398C252.703 321.016 255.629 323.946 259.237 323.946C262.845 323.946 265.771 321.005 265.771 317.398C265.771 313.791 262.845 310.849 259.237 310.849C255.629 310.849 252.703 313.791 252.703 317.398ZM256.381 317.398C256.381 315.822 257.662 314.526 259.237 314.526C260.812 314.526 262.093 315.81 262.093 317.398C262.093 318.985 260.812 320.269 259.237 320.269C257.662 320.269 256.381 318.985 256.381 317.398Z"
                    fill="#C48C5E"
                  />
                  <path
                    d="M335.643 290.819L315.511 290.819"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M315.51 290.819L308.917 290.819L304.251 286.185"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M304.253 286.184L301.644 283.592"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M301.643 283.593L299.034 281.001"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M299.032 281.002L294.367 276.368L294.367 269.819"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M294.369 269.818L294.369 266.865"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M294.369 266.864L294.369 263.911"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M292.518 263.911L296.231 263.911L296.231 260.957L292.518 260.957L292.518 263.911Z"
                    fill="#C48C5E"
                  />
                  <path
                    d="M294.373 251.049C290.73 251.049 287.78 253.932 287.78 257.48C287.78 261.029 290.741 263.912 294.373 263.912C298.004 263.912 300.966 261.029 300.966 257.48C300.966 253.932 298.004 251.049 294.373 251.049ZM294.373 254.667C295.959 254.667 297.264 255.928 297.264 257.48C297.264 259.033 295.971 260.294 294.373 260.294C292.774 260.294 291.482 259.033 291.482 257.48C291.482 255.928 292.774 254.667 294.373 254.667Z"
                    fill="#C48C5E"
                  />
                  <path
                    d="M333.538 269.996L313.665 269.996"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M310.738 271.839L313.664 271.839L313.664 268.151L310.738 268.151L310.738 271.839Z"
                    fill="#C48C5E"
                  />
                  <path
                    d="M300.91 269.993C300.91 273.612 303.766 276.542 307.28 276.542C310.794 276.542 313.649 273.6 313.649 269.993C313.649 266.386 310.794 263.445 307.28 263.445C303.766 263.445 300.91 266.386 300.91 269.993ZM304.506 269.993C304.506 268.417 305.752 267.121 307.291 267.121C308.831 267.121 310.077 268.406 310.077 269.993C310.077 271.581 308.831 272.865 307.291 272.865C305.752 272.865 304.506 271.581 304.506 269.993Z"
                    fill="#C48C5E"
                  />
                  <path
                    d="M279.478 233.713L279.478 256.219"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M279.478 256.218L279.478 259.253"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M279.478 259.252L279.478 262.298"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M279.478 262.298L279.478 265.333"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M279.478 265.336L279.478 268.371"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M279.478 268.369L279.478 271.416"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M279.478 271.418L279.478 277.966L274.812 282.601"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M274.81 282.598L272.753 284.641"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M272.757 284.641L270.7 286.684"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M270.698 286.685L268.642 288.728"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M268.641 288.727L266.584 290.77"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M265.836 294.126L267.896 292.079L265.27 289.47L263.21 291.517L265.836 294.126Z"
                    fill="#C48C5E"
                  />
                  <path
                    d="M257.614 299.677C260.188 302.233 264.29 302.315 266.758 299.864C269.226 297.412 269.143 293.338 266.57 290.782C263.996 288.226 259.894 288.144 257.426 290.595C254.958 293.047 255.041 297.12 257.614 299.677ZM260.129 297.179C259.001 296.058 258.966 294.272 260.047 293.21C261.128 292.136 262.926 292.171 264.043 293.292C265.159 294.412 265.206 296.198 264.125 297.261C263.044 298.334 261.246 298.299 260.129 297.179Z"
                    fill="#C48C5E"
                  />
                  <path
                    d="M231.294 274.208L247.23 274.208"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M247.229 274.21L253.822 274.21L258.487 269.576"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M258.49 269.576L260.535 267.545"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M261.849 268.844L263.894 266.813L261.268 264.205L259.223 266.236L261.849 268.844Z"
                    fill="#C48C5E"
                  />
                  <path
                    d="M269.452 258.683C266.878 256.127 262.788 256.033 260.332 258.473C257.876 260.912 257.97 264.975 260.543 267.531C263.117 270.087 267.207 270.181 269.663 267.741C272.119 265.301 272.025 261.239 269.452 258.683ZM266.937 261.181C268.065 262.302 268.1 264.076 267.031 265.15C265.961 266.212 264.163 266.177 263.035 265.056C261.907 263.936 261.871 262.161 262.941 261.088C264.01 260.025 265.808 260.06 266.937 261.181Z"
                    fill="#C48C5E"
                  />
                  <path
                    d="M283.608 233.551C254.718 233.551 231.298 256.813 231.298 285.507C231.298 314.202 254.718 337.463 283.608 337.463C312.497 337.463 335.917 314.202 335.917 285.507C335.917 256.813 312.497 233.551 283.608 233.551Z"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M283.604 221.962C248.27 221.962 219.625 250.413 219.625 285.509C219.625 320.605 248.27 349.056 283.604 349.056C318.939 349.056 347.584 320.605 347.584 285.509C347.584 250.413 318.939 221.962 283.604 221.962Z"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M237.712 330.319L220.871 347.537"
                    stroke="#C48C5E"
                    strokeWidth="3.16"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M328.323 240.568L344.506 224.494"
                    stroke="#C48C5E"
                    strokeWidth="3.16"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M238.087 240.449L221.61 224.574"
                    stroke="#C48C5E"
                    strokeWidth="3.16"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M328.44 330.435L344.506 346.392"
                    stroke="#C48C5E"
                    strokeWidth="3.16"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M219.228 285.331L183.595 285.681"
                    stroke="#C48C5E"
                    strokeWidth="3.16"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M347.176 285.508L382.809 285.508"
                    stroke="#C48C5E"
                    strokeWidth="3.16"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M283.379 221.957L283.026 186.565"
                    stroke="#C48C5E"
                    strokeWidth="3.16"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M283.201 349.043L283.201 384.435"
                    stroke="#C48C5E"
                    strokeWidth="3.16"
                    strokeMiterlimit="10"
                  />
                </g>
                <g
                  className={`${activeChild === 'child2' ? 'opacity-100' : 'opacity-0'}`}
                >
                  <path
                    d="M353.09 269.809L341.903 270.094C340.207 263.084 337.567 257.747 334.142 252.523L334.176 252.318L341.88 244.114C343.599 242.316 343.519 239.414 341.721 237.707L327.609 224.279C325.8 222.56 322.955 222.629 321.236 224.427L313.657 232.529C308.08 229.331 303.209 227.067 296.119 225.826L296.119 225.781L295.835 214.594C295.766 212.102 293.445 210.384 290.952 210.441L271.491 210.942C268.999 211.01 268.123 212.819 268.191 215.3L268.476 226.486C261.465 228.182 255.934 230.822 250.699 234.259L250.392 234.225L242.141 226.52C240.343 224.802 237.418 224.882 235.7 226.691L222.259 240.802C220.541 242.6 220.597 245.456 222.407 247.175L230.521 255.175C227.323 260.751 225.07 266.043 223.818 273.132L223.761 273.132L212.574 273.417C210.082 273.485 208.739 274.953 208.807 277.445L209.308 296.905C209.376 299.397 210.799 301.126 213.28 301.058L224.467 300.774C226.163 307.784 228.791 312.893 232.228 318.116L232.194 318.219L224.49 326.367C222.771 328.176 222.851 331.033 224.649 332.751L238.761 346.168C240.57 347.886 243.416 347.818 245.134 346.008L253.339 337.883C258.916 341.081 264.413 343.323 271.503 344.574L271.503 344.631L271.787 355.818C271.856 358.299 272.937 360.506 275.429 360.438L294.89 359.937C297.371 359.869 299.499 357.593 299.431 355.101L299.146 343.914C306.157 342.219 311.062 339.601 316.297 336.165L316.297 336.199L324.388 343.903C326.187 345.621 329.032 345.542 330.75 343.744L344.157 329.633C345.875 327.823 345.795 324.978 343.986 323.26L335.871 315.476C339.069 309.9 341.289 303.414 342.563 297.747L342.609 297.747L353.796 297.462C356.288 297.394 358.872 295.459 358.803 292.967L358.303 273.508C358.234 271.015 355.571 269.752 353.09 269.821L353.09 269.809Z"
                    stroke="#C48C5E"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M258.651 297.72C258.651 297.72 258.731 297.88 258.845 298.13C258.97 298.369 259.095 298.722 259.3 299.018C259.676 299.643 260.063 300.269 260.063 300.269C260.063 300.269 260.154 300.429 260.302 300.656C260.438 300.895 260.632 301.202 260.859 301.487C261.292 302.067 261.736 302.659 261.736 302.659C261.667 302.716 263.647 304.867 263.647 304.867C263.647 304.867 263.773 305.003 263.955 305.208C264.16 305.39 264.421 305.641 264.694 305.891C265.241 306.38 265.776 306.87 265.776 306.87C265.776 306.87 265.901 307.006 266.128 307.166C266.345 307.325 266.641 307.552 266.936 307.769C267.517 308.201 268.109 308.645 268.109 308.645C268.109 308.645 268.735 309.032 269.361 309.407C269.668 309.601 269.986 309.783 270.214 309.931C270.442 310.079 270.612 310.158 270.612 310.158C270.612 310.158 271.272 310.477 271.933 310.796C272.263 310.955 272.593 311.114 272.843 311.228C273.093 311.342 273.264 311.387 273.264 311.387C273.264 311.387 275.995 312.423 276.03 312.343C276.03 312.343 278.852 313.083 278.875 313.003C278.875 313.003 279.592 313.117 280.32 313.22C280.684 313.276 281.037 313.333 281.322 313.333C281.595 313.345 281.777 313.356 281.777 313.356C281.777 313.356 282.505 313.39 283.233 313.424C283.598 313.447 283.962 313.459 284.235 313.424C284.508 313.413 284.69 313.402 284.69 313.402C284.69 313.402 285.419 313.367 286.147 313.333C286.511 313.333 286.875 313.288 287.148 313.231C287.422 313.185 287.604 313.163 287.604 313.163C287.604 313.163 288.321 313.049 289.049 312.946C289.413 312.901 289.766 312.81 290.028 312.742C290.289 312.673 290.472 312.628 290.472 312.628C290.472 312.628 291.177 312.446 291.883 312.264C292.247 312.184 292.577 312.025 292.839 311.945C293.1 311.854 293.271 311.786 293.271 311.786C293.271 311.786 293.954 311.535 294.648 311.285C295.32 310.989 295.968 310.659 295.968 310.659L297.277 310.022C297.903 309.646 298.529 309.259 298.529 309.259C298.529 309.259 298.688 309.168 298.916 309.02C299.144 308.872 299.474 308.702 299.758 308.474L300.93 307.598C300.93 307.598 301.078 307.484 301.294 307.325C301.522 307.166 301.807 306.938 302.068 306.688C302.615 306.198 303.149 305.709 303.149 305.709C303.206 305.766 305.164 303.592 305.164 303.592C305.164 303.592 305.289 303.456 305.471 303.251C305.63 303.035 305.858 302.739 306.074 302.443C306.507 301.863 306.951 301.271 306.951 301.271C306.951 301.271 307.076 301.134 307.201 300.895C307.338 300.656 307.531 300.349 307.724 300.042C308.1 299.416 308.487 298.79 308.487 298.79C308.487 298.79 308.806 298.13 309.124 297.47C309.284 297.14 309.443 296.81 309.557 296.56C309.682 296.321 309.739 296.138 309.739 296.138C309.739 296.138 309.989 295.456 310.24 294.762C310.365 294.42 310.49 294.079 310.581 293.817C310.661 293.555 310.706 293.373 310.706 293.373C310.706 293.373 310.888 292.668 311.07 291.962C311.161 291.609 311.264 291.257 311.309 290.983C311.355 290.71 311.378 290.528 311.378 290.528C311.378 290.528 311.844 287.638 311.753 287.638C311.753 287.638 311.913 284.725 311.833 284.725C311.833 284.725 311.696 281.8 311.605 281.811C311.605 281.811 311.491 281.094 311.389 280.366C311.344 280.002 311.275 279.649 311.196 279.376C311.127 279.114 311.082 278.932 311.082 278.932C311.082 278.932 310.9 278.227 310.718 277.521C310.638 277.168 310.513 276.816 310.422 276.565C310.331 276.304 310.262 276.133 310.262 276.133C310.262 276.133 310.012 275.45 309.762 274.756C309.648 274.403 309.454 274.096 309.352 273.845C309.238 273.595 309.158 273.436 309.158 273.436L308.521 272.116C308.146 271.49 307.77 270.864 307.77 270.864C307.77 270.864 307.406 270.227 306.996 269.624C306.564 269.043 306.12 268.451 306.12 268.451C306.12 268.451 306.006 268.304 305.847 268.087C305.676 267.871 305.471 267.564 305.221 267.302C304.731 266.756 304.242 266.221 304.242 266.221C304.242 266.221 304.117 266.084 303.935 265.88C303.764 265.663 303.491 265.413 303.218 265.174C302.671 264.685 302.137 264.195 302.137 264.195C302.194 264.127 299.838 262.397 299.838 262.397C299.838 262.397 299.69 262.295 299.474 262.124C299.235 261.988 298.927 261.794 298.62 261.601C297.994 261.225 297.368 260.838 297.368 260.838C297.368 260.838 297.22 260.736 296.97 260.622C296.719 260.508 296.389 260.349 296.059 260.19L294.739 259.552C294.739 259.552 294.056 259.302 293.362 259.052C293.021 258.927 292.679 258.801 292.418 258.71C292.167 258.608 291.985 258.574 291.985 258.574C291.985 258.574 291.28 258.392 290.574 258.21C290.221 258.119 289.868 258.028 289.595 257.959C289.333 257.902 289.151 257.88 289.151 257.88C289.151 257.88 288.434 257.766 287.706 257.663C287.342 257.607 286.989 257.55 286.716 257.515C286.443 257.504 286.261 257.493 286.261 257.493C286.261 257.493 285.532 257.459 284.804 257.424C284.44 257.413 284.076 257.39 283.802 257.379C283.529 257.379 283.347 257.39 283.347 257.39C283.347 257.39 283.165 257.39 282.892 257.402C282.619 257.402 282.255 257.424 281.891 257.459C281.162 257.504 280.434 257.595 280.434 257.595C280.434 257.595 279.705 257.663 278.988 257.811C278.272 257.925 277.555 258.096 277.555 258.096C277.555 258.096 276.838 258.244 276.143 258.46C275.438 258.642 274.755 258.892 274.755 258.892C274.755 258.892 274.561 258.961 274.231 259.063C273.913 259.188 273.446 259.37 272.888 259.598C271.796 260.065 270.362 260.781 269.019 261.624C267.665 262.454 266.402 263.433 265.502 264.23C265.047 264.616 264.694 264.958 264.433 265.197C264.182 265.436 264.034 265.572 264.034 265.572"
                    stroke="#C48C5E"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M255.776 286.168C257.258 286.178 258.658 286.711 259.733 287.444L259.944 287.593C260.144 287.747 260.327 287.904 260.492 288.062L260.666 288.236L260.679 288.248C260.927 288.485 261.144 288.715 261.313 288.941L261.322 288.953L261.332 288.964C261.672 289.382 261.814 289.849 262.044 290.538L262.11 290.738C262.182 291.15 262.138 291.612 262.061 292.177C261.974 292.734 261.758 293.332 261.418 293.941L261.415 293.947L261.411 293.954C260.998 294.727 260.418 295.475 259.679 296.121L259.242 296.501L259.282 296.583L258.343 297.046L257.394 297.507L257.357 297.435L256.82 297.513C255.873 297.651 254.916 297.513 254.038 297.064L254.037 297.064C253.451 296.752 252.891 296.306 252.38 295.73L252.163 295.474L252.16 295.469L251.971 295.22C251.549 294.615 251.258 293.856 251.018 292.972L251.016 292.963L251.013 292.956L250.969 292.792C250.768 291.98 250.842 291.116 250.985 290.248C251.069 289.81 251.178 289.414 251.33 289.06C251.465 288.777 251.616 288.518 251.782 288.278L251.957 288.04L251.961 288.035C252.894 286.808 254.238 286.169 255.776 286.168ZM256.119 288.242L255.941 288.258C255.019 288.368 254.224 288.843 253.684 289.55L253.579 289.695L253.577 289.697C253.093 290.409 252.777 291.42 253.038 292.464L253.038 292.481L253.063 292.575C253.307 293.503 253.85 294.291 254.584 294.787L254.733 294.881L254.744 294.887C255.589 295.376 256.6 295.459 257.525 295.141L257.524 295.14C258.457 294.824 259.139 294.18 259.559 293.453L259.558 293.452C259.999 292.714 260.206 291.832 259.978 290.935L259.973 290.917L259.967 290.898L259.867 290.609C259.63 289.988 259.252 289.412 258.667 288.978L258.528 288.88C257.854 288.431 257.006 288.178 256.119 288.242Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M320.281 294.676C320.281 294.676 320.327 294.494 320.395 294.232C320.464 293.971 320.555 293.606 320.623 293.254C320.771 292.537 320.907 291.82 320.907 291.82C320.907 291.82 321.01 291.091 321.112 290.363C321.169 289.999 321.215 289.635 321.226 289.361L321.272 288.906C321.272 288.906 321.363 288.178 321.385 287.449C321.408 286.721 321.442 285.981 321.442 285.981C321.442 285.981 321.442 285.253 321.42 284.513C321.42 283.785 321.351 283.045 321.351 283.045C321.351 283.045 321.34 282.84 321.317 282.499C321.306 282.146 321.249 281.657 321.169 281.054C321.044 279.859 320.771 278.288 320.395 276.729C320.031 275.17 319.53 273.656 319.143 272.518C318.7 271.403 318.415 270.663 318.415 270.663"
                    stroke="#C48C5E"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M320.112 295.391L321.122 295.647L321.103 295.724L321.574 296.018C322.388 296.524 323.035 297.243 323.426 298.112L323.599 298.496C324.08 299.811 324.076 301.452 323.382 302.979L323.378 302.986L323.375 302.993C322.687 304.589 321.422 305.713 320.082 306.215L319.813 306.307L319.811 306.308C318.463 306.732 317.036 306.554 315.813 305.825L315.571 305.672C314.346 304.845 313.518 303.644 313.062 302.405L312.976 302.157C312.547 300.827 312.566 299.54 313.052 298.389C313.314 297.821 313.671 297.335 314.124 296.899C314.613 296.462 315.146 296.101 315.766 295.819L315.767 295.82C316.622 295.455 317.552 295.23 318.515 295.209L319.088 295.196L319.104 295.133L320.112 295.391ZM319.479 297.39C317.644 296.758 315.707 297.613 314.951 299.241L314.939 299.267C314.24 300.928 314.933 302.934 316.608 303.864L316.608 303.865C318.353 304.841 320.613 304.072 321.442 302.128L321.441 302.127C322.313 300.213 321.352 298.024 319.479 297.39L319.479 297.39Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M290.152 248.38C290.152 248.38 289.97 248.346 289.696 248.289C289.423 248.244 289.071 248.153 288.695 248.13C287.967 248.062 287.238 247.993 287.238 247.993L285.782 247.857C285.417 247.811 285.053 247.823 284.769 247.823C284.496 247.823 284.313 247.823 284.313 247.823C284.313 247.823 283.574 247.823 282.845 247.834C282.481 247.834 282.117 247.834 281.832 247.834C281.559 247.834 281.377 247.868 281.377 247.868L278.452 248.175C278.452 248.175 278.27 248.175 277.997 248.232C277.724 248.289 277.371 248.357 277.007 248.437C276.29 248.585 275.573 248.733 275.573 248.733C275.573 248.733 275.391 248.767 275.129 248.824C274.856 248.881 274.503 248.949 274.151 249.063C273.445 249.279 272.751 249.495 272.751 249.495C272.751 249.495 272.045 249.712 271.351 249.928C270.657 250.167 269.985 250.463 269.985 250.463C269.985 250.463 267.254 251.555 267.299 251.635L264.705 253.012C264.705 253.012 264.545 253.103 264.318 253.251C264.09 253.399 263.783 253.603 263.476 253.808C262.861 254.218 262.246 254.616 262.246 254.616L261.86 254.867C261.621 255.003 261.336 255.242 261.051 255.47C260.482 255.936 259.913 256.392 259.913 256.392C259.913 256.392 259.344 256.858 258.775 257.313C258.252 257.825 257.728 258.337 257.728 258.337C257.728 258.337 255.623 260.386 255.68 260.443L253.802 262.696C253.802 262.696 253.688 262.833 253.54 263.071C253.381 263.299 253.176 263.606 252.971 263.914C252.562 264.517 252.152 265.131 252.152 265.131C252.152 265.131 252.049 265.279 251.89 265.507C251.731 265.734 251.537 266.042 251.367 266.372C251.025 267.02 250.672 267.669 250.672 267.669C250.672 267.669 250.331 268.318 249.978 268.966C249.796 269.285 249.66 269.626 249.557 269.877C249.455 270.127 249.386 270.298 249.386 270.298C249.386 270.298 249.102 270.98 248.829 271.652C248.692 271.993 248.544 272.335 248.442 272.585C248.328 272.835 248.282 273.017 248.282 273.017L247.44 275.828C247.361 275.805 246.826 278.696 246.826 278.696C246.826 278.696 246.689 279.413 246.553 280.141C246.484 280.869 246.416 281.598 246.416 281.598C246.416 281.598 246.143 284.522 246.223 284.522L246.245 287.458L246.553 290.383C246.473 290.394 247.076 293.273 247.076 293.273C247.076 293.273 247.224 293.99 247.383 294.707C247.6 295.413 247.816 296.107 247.816 296.107C247.816 296.107 248.032 296.813 248.248 297.507C248.351 297.86 248.465 298.212 248.578 298.463C248.681 298.713 248.749 298.884 248.749 298.884C248.749 298.884 249.034 299.566 249.307 300.238C249.443 300.579 249.591 300.921 249.694 301.171C249.796 301.433 249.887 301.592 249.887 301.592L251.264 304.187C251.264 304.187 251.355 304.346 251.48 304.596C251.628 304.824 251.833 305.131 252.038 305.438L252.846 306.667C252.846 306.667 252.949 306.815 253.096 307.054C253.256 307.282 253.426 307.601 253.677 307.885C254.143 308.454 254.599 309.023 254.599 309.023L255.521 310.161C255.737 310.457 256.01 310.707 256.203 310.912C256.397 311.106 256.522 311.242 256.522 311.242C256.522 311.242 257.034 311.766 257.558 312.289C257.819 312.551 258.07 312.813 258.263 313.006C258.457 313.199 258.605 313.313 258.605 313.313L260.858 315.191C260.858 315.191 260.995 315.305 261.211 315.487C261.438 315.646 261.746 315.851 262.042 316.056C262.645 316.465 263.259 316.875 263.259 316.875C263.259 316.875 263.862 317.296 264.488 317.683C265.137 318.025 265.786 318.377 265.786 318.377C265.786 318.377 268.369 319.777 268.392 319.72C268.392 319.72 269.052 320.027 269.746 320.3C270.418 320.585 271.112 320.824 271.112 320.824C271.112 320.824 271.795 321.086 272.5 321.291C273.195 321.529 273.912 321.7 273.912 321.7C273.912 321.7 274.617 321.905 275.334 322.064C276.051 322.246 276.768 322.372 276.768 322.372C276.768 322.372 277.553 322.531 278.737 322.69C279.921 322.85 281.525 322.997 283.118 323.02C284.723 323.054 286.316 322.963 287.511 322.838C288.115 322.781 288.604 322.713 288.945 322.667C289.287 322.622 289.492 322.588 289.492 322.588"
                    stroke="#C48C5E"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M295.612 244.315C296.436 244.255 297.33 244.352 298.223 244.625C299.991 245.368 301.281 246.558 301.81 247.943L301.94 248.285C302.331 249.524 302.238 250.803 301.661 251.97L301.527 252.223C300.804 253.508 299.652 254.456 298.463 254.992L298.225 255.093C296.874 255.61 295.576 255.779 294.519 255.309L294.473 255.288L294.424 255.274L294.209 255.205C293.722 255.03 293.29 254.756 292.892 254.384C292.431 253.933 292.017 253.369 291.666 252.775C291.231 252.016 290.933 251.106 290.841 250.13L290.787 249.556L290.72 249.544L291.068 247.494L291.139 247.508L291.397 247.006C291.832 246.167 292.493 245.465 293.358 244.968L293.368 244.962L293.377 244.958C293.932 244.618 294.575 244.42 295.291 244.341L295.603 244.315L295.612 244.315ZM297.321 246.531C295.477 246.064 293.561 246.997 292.994 248.774L292.942 248.955L292.94 248.959C292.487 250.759 293.391 252.739 295.172 253.287C296.895 253.983 298.85 253.011 299.62 251.32L299.619 251.319C300.47 249.463 299.451 247.379 297.572 246.606L297.54 246.592L297.506 246.582L297.321 246.531Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M247.608 255.175C247.608 255.175 247.483 255.312 247.301 255.528C247.119 255.744 246.868 256.017 246.652 256.325C246.208 256.916 245.753 257.52 245.753 257.52C245.753 257.52 245.639 257.667 245.469 257.895C245.298 258.111 245.082 258.419 244.877 258.737C244.467 259.363 244.057 259.978 244.057 259.978C244.057 259.978 243.625 260.592 243.272 261.241C242.897 261.889 242.521 262.527 242.521 262.527C242.521 262.527 242.134 263.164 241.815 263.847C241.485 264.518 241.144 265.178 241.144 265.178C241.144 265.178 241.064 265.349 240.939 265.599C240.825 265.861 240.677 266.202 240.529 266.544L239.938 267.921C239.938 267.921 239.858 268.091 239.756 268.353C239.665 268.615 239.539 268.968 239.414 269.32C239.164 270.026 238.913 270.72 238.913 270.72C238.913 270.72 238.845 270.891 238.765 271.164C238.686 271.437 238.583 271.79 238.481 272.154C238.276 272.871 238.071 273.588 238.071 273.588C238.071 273.588 238.014 273.77 237.957 274.043C237.901 274.316 237.821 274.68 237.73 275.044C237.57 275.773 237.4 276.501 237.4 276.501L236.933 279.448L236.649 282.419L236.558 285.4C236.558 285.4 236.569 286.151 236.58 286.891C236.603 287.642 236.649 288.382 236.649 288.382C236.649 288.382 236.694 289.121 236.762 289.872C236.831 290.612 236.922 291.352 236.922 291.352C236.922 291.352 237.309 294.584 238.174 297.724C238.993 300.877 240.29 303.869 240.29 303.869"
                    stroke="#C48C5E"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M250.548 244.976C251.316 244.697 252.101 244.608 252.865 244.687L252.865 244.688L252.87 244.688C254.3 244.828 255.541 245.506 256.4 246.635L256.567 246.867C257.443 248.156 257.744 249.711 257.604 251.103C257.521 251.8 257.338 252.475 257.063 253.097C256.798 253.675 256.402 254.177 255.892 254.679C254.944 255.509 253.78 255.959 252.459 256.012L252.191 256.017L252.184 256.017C251.294 256.027 250.355 255.835 249.475 255.436L248.949 255.198L248.887 255.273L248.089 254.601L248.086 254.598L247.282 253.927L247.336 253.862L247.042 253.403C246.53 252.605 246.252 251.68 246.25 250.701C246.27 249.195 246.936 247.52 248.297 246.312L248.309 246.301L248.32 246.29C248.871 245.756 249.54 245.369 250.238 245.091L250.539 244.979L250.548 244.976ZM254.854 248.168C253.68 246.665 251.4 246.427 249.857 247.724L249.711 247.855L249.708 247.857C248.974 248.549 248.539 249.468 248.495 250.405L248.494 250.417L248.494 250.428C248.48 251.374 248.827 252.292 249.539 252.99C250.237 253.673 251.134 254.005 252.008 254.011L252.008 254.012C252.013 254.012 252.018 254.011 252.022 254.011C252.026 254.011 252.029 254.012 252.032 254.012L252.032 254.011C252.902 254.034 253.811 253.752 254.503 253.104L255.889 251.806L255.378 251.806C255.846 250.643 255.71 249.258 254.854 248.168L254.854 248.168Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M271.192 330.943C271.192 330.943 271.898 331.125 272.592 331.308L274.003 331.626C274.003 331.626 274.72 331.763 275.426 331.899C276.143 332.013 276.86 332.138 276.86 332.138C276.86 332.138 277.577 332.252 278.294 332.332C279.011 332.434 279.739 332.48 279.739 332.48C279.739 332.48 280.456 332.559 281.185 332.582C281.913 332.628 282.63 332.639 282.63 332.639C282.63 332.639 283.358 332.673 284.087 332.639C284.815 332.605 285.532 332.571 285.532 332.571C285.532 332.571 286.26 332.537 286.977 332.502C287.341 332.491 287.706 332.468 287.979 332.457C288.252 332.457 288.434 332.411 288.434 332.411L291.313 332.013C291.313 332.013 291.495 331.99 291.757 331.956C292.03 331.911 292.394 331.888 292.736 331.786C293.441 331.626 294.147 331.456 294.147 331.456L295.558 331.125C295.911 331.046 296.264 330.966 296.526 330.898C296.787 330.818 296.958 330.761 296.958 330.761L299.712 329.851C299.712 329.851 299.883 329.794 300.145 329.714C300.406 329.646 300.736 329.498 301.078 329.35C301.749 329.066 302.409 328.781 302.409 328.781C302.409 328.781 303.081 328.497 303.741 328.212C304.071 328.076 304.412 327.928 304.64 327.791C304.879 327.666 305.038 327.575 305.038 327.575L307.599 326.198C307.599 326.198 307.758 326.118 307.997 325.982C308.225 325.834 308.532 325.629 308.828 325.436C309.431 325.037 310.046 324.639 310.046 324.639C310.046 324.639 310.649 324.241 311.263 323.842C311.844 323.41 312.413 322.955 312.413 322.955C312.413 322.955 312.982 322.5 313.551 322.056C313.835 321.828 314.12 321.601 314.336 321.441C314.552 321.282 314.689 321.157 314.689 321.157L316.806 319.165C316.806 319.165 316.942 319.04 317.136 318.858C317.329 318.676 317.602 318.426 317.841 318.153C318.331 317.618 318.809 317.071 318.809 317.071C318.809 317.071 320.755 314.921 320.698 314.875L322.439 312.554C322.439 312.554 322.553 312.406 322.712 312.19C322.872 311.962 323.054 311.655 323.247 311.347C323.634 310.733 324.021 310.118 324.021 310.118L324.795 308.889C325 308.593 325.136 308.252 325.273 308.013C325.398 307.774 325.478 307.603 325.478 307.603L326.798 305.02C326.798 305.02 327.094 304.292 327.538 303.188C327.754 302.642 328.016 301.993 328.3 301.31C328.551 300.616 328.755 299.842 328.994 299.091C329.211 298.329 329.472 297.578 329.643 296.861C329.791 296.133 329.928 295.461 330.053 294.881C330.292 293.72 330.451 292.946 330.451 292.946"
                    stroke="#C48C5E"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M263.635 323.626C264.875 323.184 266.116 323.143 267.23 323.562L267.452 323.652L267.457 323.655C268.559 324.128 269.419 325.001 269.995 326.172L270.106 326.411L270.107 326.415C270.472 327.226 270.679 328.167 270.679 329.145L270.679 329.731L270.742 329.747L270.467 330.744L270.195 331.725L270.109 331.697L269.795 332.19C269.284 332.991 268.583 333.639 267.725 334.04C266.466 334.618 264.852 334.722 263.314 334.155L263.009 334.033C261.478 333.373 260.37 332.182 259.854 330.878L259.759 330.617L259.758 330.614L259.677 330.347C259.331 329.098 259.475 327.781 260.104 326.608L260.246 326.359L260.247 326.356C261.007 325.092 262.165 324.205 263.387 323.719L263.632 323.627L263.635 323.626ZM266.632 325.579C264.995 324.861 263.053 325.574 262.141 327.167L262.056 327.324C261.176 329.04 261.886 331.146 263.651 332.018L263.825 332.098L263.83 332.1C265.659 332.876 267.714 332.033 268.44 330.273L268.506 330.099C269.138 328.3 268.326 326.305 266.631 325.579L266.632 325.579Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M324.524 261.572C324.524 261.572 324.137 260.946 323.762 260.309C323.568 259.99 323.375 259.683 323.238 259.444C323.09 259.205 322.976 259.068 322.976 259.068L321.246 256.678C321.246 256.678 321.144 256.53 320.973 256.303C320.791 256.086 320.552 255.813 320.313 255.529C319.835 254.971 319.357 254.413 319.357 254.413C319.357 254.413 318.879 253.856 318.39 253.298C317.866 252.775 317.343 252.263 317.343 252.263C317.343 252.263 315.26 250.168 315.215 250.225L312.961 248.313C312.961 248.313 312.825 248.188 312.597 248.029C312.37 247.87 312.074 247.653 311.778 247.437L310.583 246.572C310.583 246.572 310.435 246.47 310.207 246.299C309.98 246.14 309.684 245.912 309.365 245.741C308.739 245.366 308.102 244.979 308.102 244.979C308.102 244.979 307.476 244.603 306.839 244.216C306.531 244.012 306.201 243.852 305.951 243.738C305.701 243.613 305.541 243.534 305.541 243.534C305.541 243.534 304.881 243.204 304.221 242.874C303.891 242.714 303.561 242.543 303.311 242.418C303.06 242.293 302.89 242.225 302.89 242.225L300.147 241.132C300.147 241.132 299.475 240.825 298.758 240.643C298.053 240.427 297.347 240.21 297.347 240.21C297.347 240.21 296.642 239.994 295.936 239.778C295.583 239.653 295.219 239.607 294.946 239.539C294.673 239.482 294.491 239.437 294.491 239.437L293.045 239.129C292.681 239.05 292.328 238.97 292.055 238.913C291.782 238.845 291.6 238.833 291.6 238.833L288.675 238.458C288.675 238.458 287.879 238.321 286.672 238.299C285.466 238.264 283.861 238.128 282.257 238.196C279.047 238.276 275.872 238.833 275.872 238.833"
                    stroke="#C48C5E"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M325.815 261.694C325.931 261.891 326.061 262.116 326.185 262.343C326.304 262.581 326.422 262.819 326.526 263.027L324.658 263.975L324.354 263.372L324.349 263.362L324.083 262.884C324.057 262.839 324.031 262.797 324.006 262.755L325.815 261.694Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M330.669 265.959C329.919 263.975 327.623 263.218 325.896 264.086C324.123 264.966 323.494 266.965 324.101 268.644L324.105 268.655L324.109 268.667C324.788 270.37 326.761 271.174 328.485 270.688L328.651 270.636C330.615 269.982 331.423 267.843 330.67 265.959L330.669 265.959ZM321.813 267.581C321.803 266.947 321.929 266.277 322.176 265.61L322.175 265.609C322.654 264.33 323.44 263.186 324.655 262.384L324.904 262.228L324.905 262.228C326.136 261.496 327.614 261.294 328.915 261.696L329.173 261.784L329.177 261.786C329.79 262.014 330.386 262.358 330.936 262.824L331.169 263.031C331.481 263.322 331.759 263.622 332.004 263.963C332.174 264.232 332.326 264.514 332.465 264.818L332.604 265.136C332.942 265.979 333.113 266.834 333.126 267.637C333.088 268.365 332.935 269.054 332.686 269.665L332.572 269.924L332.446 270.176C331.791 271.404 330.691 272.285 329.295 272.648L329.295 272.65C327.872 273.017 326.404 272.845 325.172 272.333L324.929 272.227C324.375 271.968 323.891 271.645 323.493 271.264L323.328 271.097L323.309 271.077L323.288 271.057L323.112 270.887C322.77 270.54 322.491 270.148 322.286 269.716L322.19 269.497L322.187 269.487L322.104 269.271C322.03 269.051 321.978 268.82 321.94 268.573L321.937 268.548L321.932 268.525L321.882 268.278C321.838 268.038 321.813 267.817 321.813 267.592L321.813 267.581Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M265.394 240.342C266.186 240.342 266.84 240.997 266.84 241.789C266.84 242.59 266.188 243.235 265.394 243.235C264.602 243.235 263.947 242.581 263.947 241.789C263.947 240.997 264.602 240.342 265.394 240.342Z"
                    fill="#C48C5E"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M248.401 316.077C249.193 316.077 249.848 316.731 249.848 317.523C249.848 318.324 249.196 318.97 248.401 318.97C247.609 318.97 246.955 318.316 246.955 317.523C246.955 316.731 247.609 316.077 248.401 316.077Z"
                    fill="#C48C5E"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M331.682 280.833C332.48 280.833 333.128 281.481 333.128 282.279C333.128 283.078 332.48 283.726 331.682 283.726C330.883 283.725 330.235 283.078 330.235 282.279C330.235 281.481 330.883 280.833 331.682 280.833Z"
                    fill="#C48C5E"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M304.453 314.882C305.252 314.882 305.899 315.529 305.899 316.328C305.899 317.127 305.252 317.774 304.453 317.774C303.654 317.774 303.007 317.127 303.007 316.328C303.007 315.529 303.654 314.882 304.453 314.882Z"
                    fill="#C48C5E"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M311.85 258.15C312.648 258.15 313.296 258.797 313.296 259.596C313.296 260.395 312.648 261.042 311.85 261.042C311.051 261.042 310.403 260.395 310.403 259.596C310.403 258.797 311.051 258.15 311.85 258.15Z"
                    fill="#C48C5E"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M257.998 274.12C258.79 274.12 259.444 274.774 259.444 275.566C259.444 276.367 258.793 277.012 257.998 277.012C257.206 277.012 256.552 276.358 256.552 275.566C256.552 274.774 257.206 274.12 257.998 274.12Z"
                    fill="#C48C5E"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M289.649 302.901C289.649 302.901 290.343 302.64 291.037 302.389C291.709 302.071 292.369 301.741 292.369 301.741C292.369 301.741 292.539 301.672 292.778 301.525C293.017 301.377 293.336 301.183 293.655 300.99C293.973 300.808 294.281 300.591 294.497 300.421C294.725 300.25 294.873 300.148 294.873 300.148C294.918 300.204 297.149 298.247 297.092 298.19L298.082 297.086L298.97 295.903C298.97 295.903 299.083 295.755 299.231 295.516C299.379 295.277 299.573 294.958 299.766 294.64C299.971 294.333 300.142 294.002 300.256 293.741C300.381 293.49 300.46 293.32 300.46 293.32C300.517 293.342 301.598 290.577 301.519 290.554C301.519 290.554 301.701 289.837 301.883 289.121C301.997 288.392 302.111 287.653 302.111 287.653C302.179 287.653 302.293 284.694 302.224 284.694C302.224 284.694 302.224 284.512 302.202 284.227C302.179 283.954 302.19 283.579 302.111 283.214C301.997 282.486 301.883 281.746 301.883 281.746C301.883 281.746 301.701 281.03 301.519 280.313C301.439 279.948 301.291 279.607 301.2 279.345C301.109 279.084 301.041 278.913 301.041 278.913C301.109 278.89 299.846 276.193 299.766 276.239C299.766 276.239 299.402 275.59 298.981 274.987L298.093 273.803C298.093 273.803 297.979 273.655 297.786 273.451C297.604 273.246 297.353 272.973 297.103 272.7C296.864 272.415 296.58 272.176 296.375 271.994C296.17 271.812 296.033 271.687 296.033 271.687C296.079 271.63 293.712 269.832 293.666 269.9C293.666 269.9 293.507 269.809 293.268 269.661C293.029 269.525 292.722 269.308 292.38 269.149C291.709 268.83 291.049 268.5 291.049 268.5C291.049 268.5 290.354 268.239 289.66 267.988C289.319 267.84 288.955 267.772 288.681 267.692C288.408 267.624 288.238 267.579 288.238 267.579C288.249 267.51 285.324 267.021 285.313 267.101L283.833 267.021C283.094 267.055 282.354 267.101 282.354 267.101C282.354 267.021 279.418 267.51 279.429 267.579C279.429 267.579 279.247 267.624 278.985 267.692C278.712 267.761 278.348 267.84 278.006 267.988C277.312 268.25 276.618 268.5 276.618 268.5C276.618 268.5 275.947 268.819 275.287 269.149C274.945 269.297 274.649 269.525 274.399 269.661C274.16 269.809 274.001 269.9 274.001 269.9C273.955 269.832 271.588 271.63 271.633 271.687C271.633 271.687 271.497 271.812 271.292 271.994C271.087 272.187 270.803 272.415 270.564 272.7C270.313 272.973 270.063 273.246 269.881 273.451C269.687 273.655 269.573 273.803 269.573 273.803C269.573 273.803 269.13 274.395 268.686 274.987C268.265 275.601 267.901 276.239 267.901 276.239C267.821 276.193 266.569 278.89 266.626 278.913C266.626 278.913 266.558 279.084 266.467 279.345C266.376 279.607 266.228 279.948 266.148 280.313C265.966 281.03 265.784 281.746 265.784 281.746C265.784 281.746 265.67 282.475 265.556 283.214C265.488 283.579 265.488 283.954 265.465 284.227C265.454 284.5 265.442 284.694 265.442 284.694C265.374 284.694 265.476 287.664 265.556 287.653C265.556 287.653 265.67 288.381 265.784 289.121C265.966 289.837 266.148 290.554 266.148 290.554C266.068 290.577 267.149 293.354 267.206 293.32L267.411 293.741C267.525 293.991 267.696 294.321 267.901 294.64C268.094 294.958 268.287 295.277 268.435 295.516C268.572 295.755 268.697 295.903 268.697 295.903C268.697 295.903 269.141 296.495 269.585 297.086C270.086 297.633 270.575 298.19 270.575 298.19C270.518 298.247 272.76 300.204 272.794 300.148C272.794 300.148 272.942 300.261 273.17 300.421C273.386 300.591 273.693 300.808 274.012 300.99C274.331 301.183 274.649 301.377 274.888 301.525C275.127 301.672 275.298 301.741 275.298 301.741C275.298 301.741 275.969 302.059 276.629 302.389C277.324 302.651 278.018 302.901 278.018 302.901C277.995 302.981 280.886 303.675 280.897 303.607C280.897 303.607 281.079 303.63 281.352 303.675C281.625 303.721 281.99 303.789 282.365 303.789C283.105 303.823 283.845 303.869 283.845 303.869L285.324 303.789C285.7 303.789 286.064 303.721 286.337 303.675C286.61 303.63 286.792 303.607 286.792 303.607C286.804 303.675 289.694 302.981 289.672 302.901L289.649 302.901Z"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                </g>
                <g
                  className={`[&>path]:origin-[center_center]! [&>path]:rotate-[45deg]! ${activeChild === 'child3' ? 'opacity-100' : 'opacity-0'}`}
                >
                  <path
                    d="M295.784 253.217L351.168 260.28C362.099 261.741 366.277 275.292 358.051 282.603L347.729 291.778"
                    stroke="#C48C5E"
                    strokeWidth="3.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M286.498 262.082C291.96 262.082 296.388 257.674 296.388 252.238C296.388 246.801 291.96 242.394 286.498 242.394C281.036 242.394 276.608 246.801 276.608 252.238C276.608 257.674 281.036 262.082 286.498 262.082Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M342.969 302.769C346.689 302.769 349.705 299.767 349.705 296.065C349.705 292.362 346.689 289.36 342.969 289.36C339.249 289.36 336.233 292.362 336.233 296.065C336.233 299.767 339.249 302.769 342.969 302.769Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M249.737 268.378L273.018 217.86C277.676 207.91 291.917 207.981 296.477 217.976L302.198 230.516"
                    stroke="#C48C5E"
                    strokeWidth="3.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M246.031 286.747C251.493 286.747 255.921 282.339 255.921 276.903C255.921 271.466 251.493 267.059 246.031 267.059C240.569 267.059 236.142 271.466 236.142 276.903C236.142 282.339 240.569 286.747 246.031 286.747Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M304.894 243.014C308.614 243.014 311.629 240.012 311.629 236.309C311.629 232.607 308.614 229.605 304.894 229.605C301.174 229.605 298.158 232.607 298.158 236.309C298.158 240.012 301.174 243.014 304.894 243.014Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M250.546 316.645L209.038 279.47C200.883 272.079 205.194 258.573 216.138 257.218L229.867 255.522"
                    stroke="#C48C5E"
                    strokeWidth="3.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M257.618 332.551C263.08 332.551 267.508 328.144 267.508 322.707C267.508 317.271 263.08 312.863 257.618 312.863C252.156 312.863 247.729 317.271 247.729 322.707C247.729 328.144 252.156 332.551 257.618 332.551Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M236.236 261.385C239.956 261.385 242.971 258.384 242.971 254.681C242.971 250.978 239.956 247.977 236.236 247.977C232.516 247.977 229.5 250.978 229.5 254.681C229.5 258.384 232.516 261.385 236.236 261.385Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M297.079 330.259L249.058 358.613C239.537 364.158 227.872 356.036 229.834 345.231L232.299 331.681"
                    stroke="#C48C5E"
                    strokeWidth="3.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M304.999 335.192C310.461 335.192 314.889 330.785 314.889 325.348C314.889 319.911 310.461 315.504 304.999 315.504C299.537 315.504 295.109 319.911 295.109 325.348C295.109 330.785 299.537 335.192 304.999 335.192Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M233.392 332.091C237.112 332.091 240.127 329.09 240.127 325.387C240.127 321.684 237.112 318.683 233.392 318.683C229.672 318.683 226.656 321.684 226.656 325.387C226.656 329.09 229.672 332.091 233.392 332.091Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M324.024 290.589L336.254 344.817C338.603 355.542 327.236 364.071 317.524 358.872L305.339 352.345"
                    stroke="#C48C5E"
                    strokeWidth="3.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M321.781 291.417C327.243 291.417 331.671 287.01 331.671 281.573C331.671 276.137 327.243 271.729 321.781 271.729C316.319 271.729 311.892 276.137 311.892 281.573C311.892 287.01 316.319 291.417 321.781 291.417Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M299.664 356.071C303.384 356.071 306.4 353.069 306.4 349.366C306.4 345.664 303.384 342.662 299.664 342.662C295.944 342.662 292.929 345.664 292.929 349.366C292.929 353.069 295.944 356.071 299.664 356.071Z"
                    stroke="#C48C5E"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M284.452 279.82L286.57 286.307C286.788 286.98 287.42 287.436 288.131 287.436L294.983 287.436C296.571 287.436 297.234 289.46 295.948 290.39L290.405 294.397C289.831 294.814 289.591 295.549 289.809 296.222L291.926 302.709C292.416 304.215 290.689 305.464 289.399 304.534L283.856 300.526C283.282 300.11 282.504 300.11 281.925 300.526L276.382 304.534C275.096 305.464 273.366 304.21 273.855 302.709L275.973 296.222C276.191 295.549 275.95 294.814 275.376 294.397L269.833 290.39C268.547 289.46 269.21 287.436 270.799 287.436L277.65 287.436C278.362 287.436 278.989 286.98 279.211 286.307L281.329 279.82C281.818 278.314 283.958 278.314 284.448 279.82L284.452 279.82Z"
                    stroke="#C48C5E"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                </g>
              </svg>
              <svg
                className="absolute w-[85%] h-[85%] 2xl:w-full 2xl:h-full max-w-[695px] max-h-[695px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-half-circle origin-[50%_50%]!"
                viewBox="0 0 695 695"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2052_1342)">
                  <path
                    d="M87.4926 197.556C2.73136 349.272 55.8601 534.328 208.699 617.692"
                    stroke="#009BF6"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M89.7478 198.908C90.4235 197.657 89.9487 196.095 88.6976 195.42C87.4465 194.744 85.885 195.219 85.2093 196.47C84.5335 197.721 85.0084 199.282 86.2594 199.958C87.5105 200.634 89.072 200.159 89.7478 198.908Z"
                    fill="#009BF6"
                  />
                  <path
                    d="M209.886 615.345C211.119 616.048 211.557 617.619 210.854 618.852C210.151 620.084 208.58 620.523 207.348 619.819C206.115 619.116 205.677 617.546 206.38 616.313C207.083 615.08 208.654 614.642 209.886 615.345Z"
                    fill="#009BF6"
                  />
                  <path
                    d="M23.9287 408.071C57.278 577.146 203.277 689.495 374.736 679.432"
                    stroke="#00396F"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M26.5213 407.651C26.2199 406.263 24.8593 405.377 23.4621 405.67C22.0741 405.971 21.1883 407.332 21.4805 408.729C21.7819 410.117 23.1425 411.003 24.5397 410.71C25.9277 410.418 26.8135 409.048 26.5213 407.651Z"
                    fill="#00396F"
                  />
                  <path
                    d="M374.499 676.82C375.923 676.756 377.119 677.861 377.183 679.286C377.247 680.71 376.142 681.907 374.718 681.971C373.293 682.034 372.097 680.929 372.033 679.505C371.969 678.08 373.074 676.884 374.499 676.82Z"
                    fill="#00396F"
                  />
                  <path
                    d="M115.07 562.362C204.096 657.287 333.01 689.577 456.599 647.388C726.152 547.888 741.694 179.055 481.977 57.237"
                    stroke="#0073E5"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M117.043 560.654C116.056 559.631 114.431 559.595 113.399 560.572C112.376 561.558 112.34 563.184 113.317 564.216C114.303 565.238 115.929 565.275 116.961 564.298C117.983 563.312 118.02 561.686 117.043 560.654Z"
                    fill="#0073E5"
                  />
                  <path
                    d="M480.953 59.6482C479.675 59.0272 479.136 57.4931 479.757 56.2055C480.378 54.927 481.912 54.3882 483.2 55.0092C484.478 55.6302 485.017 57.1643 484.396 58.4519C483.775 59.7304 482.241 60.2691 480.953 59.6482Z"
                    fill="#0073E5"
                  />
                  <path
                    d="M523.7 47.0637C321.577 -67.1019 72.0601 36.5622 12.5117 263.021"
                    stroke="#0067AC"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M522.331 49.2828C523.573 49.9677 525.144 49.5202 525.829 48.2783C526.523 47.0364 526.066 45.4657 524.824 44.7808C523.582 44.0959 522.011 44.5434 521.327 45.7853C520.642 47.0272 521.089 48.5979 522.331 49.2828Z"
                    fill="#0067AC"
                  />
                  <path
                    d="M15.0589 263.579C14.6845 264.949 13.2691 265.762 11.8993 265.387C10.5295 265.013 9.7168 263.597 10.0912 262.228C10.4656 260.858 11.881 260.045 13.2508 260.42C14.6206 260.794 15.4333 262.209 15.0589 263.579Z"
                    fill="#0067AC"
                  />
                  <path
                    d="M577.898 145.961C491.1 51.3013 365.52 21.9517 248.039 62.853"
                    stroke="#00B8FA"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M575.907 147.65C576.875 148.691 578.51 148.737 579.551 147.769C580.592 146.801 580.637 145.166 579.669 144.125C578.702 143.084 577.067 143.039 576.026 144.007C574.985 144.975 574.939 146.609 575.907 147.65Z"
                    fill="#00B8FA"
                  />
                  <path
                    d="M248.999 65.2819C247.647 65.7384 246.186 65.0079 245.739 63.6655C245.282 62.314 246.013 60.8529 247.355 60.4055C248.706 59.9489 250.168 60.6794 250.615 62.0218C251.072 63.3733 250.341 64.8344 248.999 65.2819Z"
                    fill="#00B8FA"
                  />
                  <path
                    d="M290.73 632.239C567.278 688.153 756.479 361.244 562.63 150.317"
                    stroke="#00B2EC"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M291.342 629.699C289.945 629.435 288.593 630.357 288.337 631.754C288.073 633.151 288.995 634.503 290.392 634.758C291.789 635.023 293.141 634.101 293.396 632.704C293.661 631.307 292.739 629.955 291.342 629.699Z"
                    fill="#00B2EC"
                  />
                  <path
                    d="M560.765 152.161C559.816 151.102 559.907 149.476 560.966 148.527C562.026 147.577 563.651 147.668 564.601 148.728C565.55 149.787 565.459 151.412 564.4 152.362C563.34 153.312 561.715 153.221 560.765 152.161Z"
                    fill="#00B2EC"
                  />
                  <path
                    d="M388.264 692.5C482.367 680.829 558.462 638.412 617.81 567.723"
                    stroke="#00D1FE"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M388.027 689.878C386.621 690.079 385.635 691.376 385.836 692.782C386.036 694.189 387.333 695.175 388.739 694.974C390.146 694.773 391.132 693.476 390.931 692.07C390.73 690.664 389.433 689.678 388.027 689.878Z"
                    fill="#00D1FE"
                  />
                  <path
                    d="M615.746 566.106C616.677 565.028 618.303 564.919 619.38 565.85C620.458 566.782 620.568 568.407 619.636 569.485C618.705 570.562 617.079 570.672 616.002 569.74C614.924 568.809 614.815 567.183 615.746 566.106Z"
                    fill="#00D1FE"
                  />
                  <path
                    d="M673.135 432.389C739.843 167.668 487.924 -57.9515 232.398 36.3616"
                    stroke="#0067D9"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M670.623 431.649C670.295 433.028 671.144 434.425 672.523 434.754C673.902 435.083 675.299 434.234 675.628 432.855C675.956 431.476 675.107 430.079 673.728 429.75C672.349 429.421 670.952 430.27 670.623 431.649Z"
                    fill="#0067D9"
                  />
                  <path
                    d="M233.393 38.7818C232.05 39.2566 230.58 38.5627 230.105 37.2203C229.631 35.8779 230.325 34.4077 231.667 33.9328C233.009 33.4579 234.48 34.152 234.954 35.4944C235.429 36.8367 234.735 38.3069 233.393 38.7818Z"
                    fill="#0067D9"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2052_1342">
                    <rect width="695" height="695" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full 2xl:p-[10%]">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 800 800"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="animate-energy-circle"
                    d="M191.687 173.607C190.727 174.619 189.098 174.687 188.054 173.756C187.011 172.825 186.941 171.245 187.901 170.233C188.861 169.22 190.49 169.152 191.534 170.084C192.577 171.015 192.647 172.595 191.687 173.607Z"
                    fill="#0085F0"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M785.411 436.287C784.657 437.451 785.016 438.986 786.216 439.717C787.416 440.447 788.999 440.099 789.752 438.935C790.506 437.771 790.146 436.237 788.946 435.506C787.746 434.775 786.164 435.124 785.411 436.287Z"
                    fill="#0085F0"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M304.131 765.425C302.737 765.668 301.404 764.763 301.153 763.41C300.902 762.058 301.836 760.765 303.23 760.522C304.624 760.279 305.957 761.184 306.208 762.537C306.459 763.889 305.525 765.182 304.131 765.425Z"
                    fill="#0085F0"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M672.887 224.256C673.972 225.148 675.585 225.013 676.505 223.961C677.424 222.909 677.285 221.344 676.2 220.452C675.115 219.56 673.502 219.695 672.582 220.747C671.663 221.8 671.802 223.364 672.887 224.256Z"
                    fill="#0085F0"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M516.112 275.661C515.072 274.722 515.019 273.15 515.979 272.138C516.947 271.129 518.568 271.077 519.612 272.008C520.651 272.947 520.705 274.519 519.745 275.532C518.777 276.54 517.156 276.592 516.112 275.661Z"
                    fill="#005AC9"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M712.419 536.381C711.084 536.842 710.382 538.259 710.853 539.561C711.328 540.856 712.789 541.537 714.132 541.08C715.466 540.62 716.169 539.203 715.698 537.9C715.223 536.606 713.762 535.925 712.419 536.381Z"
                    fill="#005AC9"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M289.099 125.941C288.096 124.971 288.083 123.399 289.088 122.419C290.093 121.438 291.709 121.434 292.72 122.408C293.723 123.378 293.736 124.95 292.731 125.93C291.731 126.903 290.11 126.916 289.099 125.941Z"
                    fill="#00D5FF"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M2.3953 534.871C0.977705 534.964 -0.0935685 536.149 0.00647429 537.516C0.102389 538.891 1.3245 539.93 2.73398 539.833C4.15158 539.74 5.22285 538.555 5.12281 537.188C5.0269 535.813 3.80479 534.774 2.3953 534.871Z"
                    fill="#00D5FF"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M60.1149 624.974C59.682 626.286 58.2394 627.011 56.8866 626.591C55.5338 626.171 54.7866 624.772 55.2196 623.46C55.6525 622.148 57.0951 621.423 58.4479 621.843C59.8007 622.263 60.5479 623.662 60.1149 624.974Z"
                    fill="#0085F0"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M668.971 454.377C669.112 455.745 670.375 456.744 671.789 456.6C673.198 456.464 674.229 455.238 674.08 453.867C673.94 452.5 672.676 451.5 671.263 451.644C669.853 451.781 668.822 453.006 668.971 454.377Z"
                    fill="#0085F0"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M723.21 331.599C722.019 330.853 721.672 329.314 722.441 328.159C723.211 327.003 724.797 326.666 725.989 327.413C727.181 328.159 727.528 329.698 726.758 330.854C725.988 332.009 724.402 332.346 723.21 331.599Z"
                    fill="#00D5FF"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M419.48 797.803C419.641 799.17 420.916 800.146 422.33 799.982C423.74 799.826 424.747 798.589 424.578 797.217C424.416 795.85 423.141 794.874 421.727 795.038C420.317 795.194 419.31 796.431 419.48 797.803Z"
                    fill="#00D5FF"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M264.279 3.92858C263.46 2.80151 263.732 1.25143 264.894 0.457702C266.056 -0.336025 267.654 -0.0724216 268.473 1.05465C269.291 2.18172 269.019 3.7318 267.857 4.52553C266.695 5.31926 265.097 5.05565 264.279 3.92858Z"
                    fill="#0078E8"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M692.854 316.338C692.36 317.629 693.042 319.056 694.374 319.535C695.706 320.014 697.177 319.352 697.67 318.06C698.164 316.769 697.482 315.342 696.15 314.863C694.818 314.384 693.348 315.046 692.854 316.338Z"
                    fill="#0078E8"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M643.018 235.87C642.596 234.553 643.355 233.164 644.706 232.75C646.065 232.341 647.497 233.077 647.923 234.387C648.349 235.697 647.586 237.094 646.235 237.507C644.876 237.917 643.444 237.18 643.018 235.87Z"
                    fill="#009CDF"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M756.837 178.657C755.522 179.157 754.864 180.606 755.389 181.885C755.905 183.16 757.398 183.798 758.717 183.29C760.032 182.789 760.69 181.341 760.166 180.062C759.65 178.787 758.156 178.148 756.837 178.657Z"
                    fill="#009CDF"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M609.357 150.441C609.653 151.786 608.776 153.107 607.394 153.406C606.007 153.692 604.645 152.842 604.338 151.501C604.042 150.156 604.919 148.836 606.301 148.537C607.688 148.25 609.05 149.101 609.357 150.441Z"
                    fill="#0064D5"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M522.666 106.611C524.078 106.743 525.331 105.737 525.467 104.367C525.604 102.998 524.566 101.783 523.154 101.651C521.742 101.519 520.489 102.525 520.353 103.894C520.217 105.264 521.254 106.479 522.666 106.611Z"
                    fill="#0064D5"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M527.749 149.338C529.11 149.723 529.886 151.106 529.49 152.426C529.093 153.746 527.667 154.499 526.306 154.115C524.944 153.73 524.169 152.347 524.565 151.026C524.961 149.706 526.388 148.954 527.749 149.338Z"
                    fill="#00D2FE"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M229.383 155.139C230.504 155.979 232.118 155.785 232.985 154.697C233.852 153.609 233.652 152.044 232.53 151.203C231.408 150.362 229.795 150.557 228.928 151.645C228.061 152.733 228.261 154.298 229.383 155.139Z"
                    fill="#00D2FE"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M110.219 670.201C111.317 671.069 111.484 672.638 110.589 673.702C109.694 674.766 108.076 674.929 106.979 674.06C105.882 673.192 105.714 671.623 106.609 670.559C107.505 669.495 109.122 669.332 110.219 670.201Z"
                    fill="#00D5FF"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M204.905 103.282C204.924 101.903 203.788 100.778 202.379 100.757C200.958 100.739 199.798 101.841 199.776 103.207C199.758 104.585 200.894 105.71 202.302 105.732C203.723 105.749 204.883 104.648 204.905 103.282Z"
                    fill="#00D5FF"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M554.919 734.557C556.31 734.808 557.233 736.105 556.971 737.462C556.712 738.811 555.375 739.706 553.976 739.451C552.585 739.201 551.662 737.904 551.924 736.547C552.182 735.198 553.52 734.303 554.919 734.557Z"
                    fill="#00C2FB"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M331.781 123.204C333.048 122.581 333.547 121.084 332.905 119.855C332.262 118.627 330.718 118.142 329.452 118.765C328.185 119.389 327.686 120.886 328.328 122.114C328.971 123.343 330.514 123.827 331.781 123.204Z"
                    fill="#00C2FB"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M367.599 764.823C368.507 765.875 368.365 767.45 367.28 768.331C366.195 769.212 364.571 769.075 363.663 768.022C362.754 766.97 362.896 765.395 363.981 764.514C365.066 763.633 366.69 763.77 367.599 764.823Z"
                    fill="#006FB7"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M80.6386 236.008C81.6108 235.011 81.5612 233.431 80.5257 232.485C79.4902 231.538 77.8693 231.59 76.893 232.594C75.9167 233.598 75.9705 235.17 77.006 236.117C78.0333 237.06 79.6623 237.012 80.6386 236.008Z"
                    fill="#006FB7"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M612.368 637.72C613.723 637.318 615.159 638.066 615.569 639.388C615.983 640.702 615.211 642.095 613.848 642.492C612.486 642.89 611.058 642.145 610.648 640.824C610.234 639.51 611.006 638.117 612.368 637.72Z"
                    fill="#00579A"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M145.354 692.988C144.289 692.076 142.664 692.176 141.732 693.212C140.792 694.244 140.895 695.82 141.963 696.724C143.028 697.636 144.653 697.536 145.585 696.5C146.525 695.468 146.422 693.892 145.354 692.988Z"
                    fill="#00579A"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M13.9657 633.504C15.1532 634.258 15.4759 635.805 14.6981 636.956C13.9202 638.108 12.3259 638.421 11.1384 637.667C9.95084 636.912 9.62816 635.366 10.406 634.214C11.1839 633.062 12.7782 632.749 13.9657 633.504Z"
                    fill="#0070B8"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M642.026 88.4037C643.447 88.441 644.619 87.3552 644.658 85.9772C644.696 84.5993 643.577 83.4623 642.156 83.425C640.735 83.3877 639.563 84.4736 639.524 85.8515C639.486 87.2294 640.605 88.3664 642.026 88.4037Z"
                    fill="#0070B8"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M420.941 755.256C422.34 755.471 423.292 756.753 423.07 758.109C422.849 759.466 421.527 760.389 420.128 760.174C418.729 759.96 417.777 758.678 417.999 757.321C418.22 755.964 419.542 755.041 420.941 755.256Z"
                    fill="#0070E2"
                  />
                  <path
                    className="animate-energy-circle"
                    d="M40.7314 587.793C40.2562 586.499 38.7953 585.818 37.4525 586.274C36.1177 586.735 35.4153 588.152 35.8863 589.454C36.3614 590.749 37.8223 591.43 39.1652 590.973C40.4999 590.513 41.2024 589.096 40.7314 587.793Z"
                    fill="#0070E2"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-[35px] sm:mt-[40px] 2xl:mt-68px] md:pl-[46px] md:pr-[46px] text-center sm:text-left fade-in-left-short">
              <h2 className="text-[22px] sm:text-[28px] 2xl:text-[45px] text-yellow-1 font-bold mb-[20px] reveal-text">
                {field_6}
              </h2>
              <Image
                src={`https://admin.pigroup.vn/storage/${field_7}`}
                alt="Smart City Features"
                width={366}
                height={50}
                className="mb-[25px] 2xl:mb-[54px] reveal-text w-[70%] mx-auto sm:mx-0 2xl:w-auto md:w-[280px]"
              />
              <div
                className="text-gray-5 leading-[22px] font-normal md:mb-[35px] [&>p]:mb-[15px] [&>p]::last:mb-[30px] text-justify sm:reveal-text sm:text-justify text-[13px] 2xl:text-[17px]"
                dangerouslySetInnerHTML={{__html: field_8}}
              ></div>
              <div className="grid justify-center mb-[20px] sm:mb-0 sm:justify-start">
                <Link
                  // href={`${field_10}`}
                  href={routeLocales[currentLocale]['digitalcity']}
                  className="reveal-text hvr-bounce-to-right flex items-center justify-center text-yellow-1 text-[13px] 2xl:text-[17px] font-semibold w-auto px-[20px] h-[30px] border border-yellow-1 hover:text-white active:text-white"
                >
                  {field_9}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
