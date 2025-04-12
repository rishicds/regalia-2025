"use client";
import { useEffect, useRef, useState } from 'react';


const images = [
  {  url: 'https://picsum.photos/id/870/600/1000' },
  {  url: 'https://picsum.photos/id/883/600/1000' },
  { url: 'https://picsum.photos/id/478/600/1000' },
  {  url: 'https://picsum.photos/id/903/600/1000' },
  {  url: 'https://picsum.photos/id/503/600/1000' },
  {  url: 'https://picsum.photos/id/521/600/1000' },
  {  url: 'https://picsum.photos/id/634/600/1000' },
  {  url: 'https://picsum.photos/id/241/600/1000' },
  {  url: 'https://picsum.photos/id/261/600/1000' },
  { url: 'https://picsum.photos/id/314/600/1000' },
  {  url: 'https://picsum.photos/id/318/600/1000' },
  {  url: 'https://picsum.photos/id/815/600/1000' },
  {  url: 'https://picsum.photos/id/742/600/1000' }
];

const FLIP_SPEED = 750;

const FlipGallery = () => {
  const flipGallery = useRef<HTMLDivElement>(null);
  const flipUnite = useRef<NodeListOf<HTMLElement>>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const flipTiming: KeyframeAnimationOptions = {
    duration: FLIP_SPEED,
    iterations: 1
  };

  const flipAnimationTop: Keyframe[] = [
    { transform: 'rotateX(0)' },
    { transform: 'rotateX(-90deg)' },
    { transform: 'rotateX(-90deg)' }
  ];

  const flipAnimationBottom: Keyframe[] = [
    { transform: 'rotateX(90deg)' },
    { transform: 'rotateX(90deg)' },
    { transform: 'rotateX(0)' }
  ];

  const flipAnimationTopReverse: Keyframe[] = [
    { transform: 'rotateX(-90deg)' },
    { transform: 'rotateX(-90deg)' },
    { transform: 'rotateX(0)' }
  ];

  const flipAnimationBottomReverse: Keyframe[] = [
    { transform: 'rotateX(0)' },
    { transform: 'rotateX(90deg)' },
    { transform: 'rotateX(90deg)' }
  ];

  useEffect(() => {
    if (flipGallery.current) {
      flipUnite.current = flipGallery.current.querySelectorAll('.unite');
      setInitialImages();
    }
  }, []);

  const setInitialImages = () => {
    flipUnite.current?.forEach((el) => {
      setImageHalf(el, images[currentIndex].url);
    });
    updateTitle();
  };

  const setImageHalf = (el: HTMLElement, url: string) => {
    el.style.backgroundImage = `url("${url}")`;
    el.style.backgroundSize = '100% 200%';
    el.style.backgroundRepeat = 'no-repeat';

    if (el.classList.contains('top') || el.classList.contains('overlay-top')) {
      el.style.backgroundPosition = 'top';
    } else {
      el.style.backgroundPosition = 'bottom';
    }
  };

  const updateGallery = (newIndex: number, isReverse = false) => {
    const topAnimation = isReverse ? flipAnimationTopReverse : flipAnimationTop;
    const bottomAnimation = isReverse ? flipAnimationBottomReverse : flipAnimationBottom;

    flipGallery.current?.querySelector('.overlay-top')?.animate(topAnimation, flipTiming);
    flipGallery.current?.querySelector('.overlay-bottom')?.animate(bottomAnimation, flipTiming);

    flipGallery.current?.style.setProperty('--title-y', '-1rem');
    flipGallery.current?.style.setProperty('--title-opacity', '0');
    flipGallery.current?.setAttribute('data-title', '');

    flipUnite.current?.forEach((el, idx) => {
      let delay = (isReverse ? !(idx === 1 || idx === 2) : (idx === 1 || idx === 2)) ? FLIP_SPEED - 200 : 0;
      setTimeout(() => setImageHalf(el, images[newIndex].url), delay);
    });

    setTimeout(() => updateTitle(newIndex), FLIP_SPEED * 0.5);
  };

  const updateTitle = (index = currentIndex) => {
    
    flipGallery.current?.style.setProperty('--title-y', '0');
    flipGallery.current?.style.setProperty('--title-opacity', '1');
  };

  const handleNav = (delta: number) => {
    const newIndex = (currentIndex + delta + images.length) % images.length;
    const isReverse = delta < 0;
    setCurrentIndex(newIndex);
    updateGallery(newIndex, isReverse);
  };

  return (
    <main className="min-h-screen grid place-content-center bg-[#210000] text-white md:mt-20">
      <div className="relative border border-white/25 bg-white/10 p-2 w-[340px] h-[500px] sm:w-[400px] sm:h-[600px]">
        <div
          ref={flipGallery}
          id="flip-gallery"
          className="relative w-full h-full [perspective:800px]"
          data-title=""
          style={{
            '--title-opacity': '0',
            '--title-y': '0'
          } as React.CSSProperties}
        >
          <div className="top unite absolute w-full h-1/2 origin-bottom" />
          <div className="bottom unite absolute w-full h-1/2 bottom-0 origin-top" />
          <div className="overlay-top unite absolute w-full h-1/2 origin-bottom" />
          <div className="overlay-bottom unite absolute w-full h-1/2 bottom-0 origin-top" />
        </div>
        <div className="absolute top-full right-0 mt-2 flex gap-2">
          <button
            type="button"
            className="text-white opacity-75 hover:scale-150 hover:opacity-100 transition"
            onClick={() => handleNav(-1)}
            title="Previous"
          >
            &#10094;
          </button>
          <button
            type="button"
            className="text-white opacity-75 hover:scale-150 hover:opacity-100 transition"
            onClick={() => handleNav(1)}
            title="Next"
          >
            &#10095;
          </button>
        </div>
      </div>
    </main>
  );
};

export default FlipGallery;
