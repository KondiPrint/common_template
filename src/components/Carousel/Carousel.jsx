'use client';

import React, { useState, createRef } from 'react';
import Image from 'next/image';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import Lightbox from './Lightbox';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1722367915746-b868e0c7e3ac?q=80&w=2729&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    txt: 'Text for image 1',
  },
  {
    src: 'https://images.unsplash.com/photo-1590217881461-15bc87ba26a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8Xzh6Rkh1aFJoeW98fGVufDB8fHx8fA%3D%3D',
    txt: 'Text for image 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1722104784480-52b6fc3e3a34?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    txt: 'Text for image 3',
  },
];

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  const refs = images.reduce((acc, val, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToImage = (i) => {
    setCurrentImage(i);
    refs[i].current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  const totalImages = images.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  const arrowStyle =
    'absolute z-10 text-base-100 bg-primary text-4xl px-2 h-12 flex items-center opacity-20 justify-center hover:opacity-95 hover:bg-secondary';

  const sliderControl = (isLeft) => (
    <button
      type='button'
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} top-[80%] sm:top-1/2 ${
        isLeft
          ? 'left-0 rounded-br-xl sm:-left-0 sm:rounded-br-full sm:rounded-tr-full'
          : 'right-0 rounded-bl-xl sm:-right-0 sm:rounded-bl-full sm:rounded-tl-full'
      }`}>
      <span role='img' aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
        {isLeft ? <FaAngleLeft /> : <FaAngleRight />}
      </span>
    </button>
  );

  const Dots = ({ currentImage, scrollToImage }) => (
    <div className='flex justify-center mt-4'>
      {images.map((_, i) => (
        <button
          key={i}
          className={`size-4 mx-1 rounded-full ${
            currentImage === i ? 'bg-primary' : 'bg-base-content hover:bg-secondary'
          }`}
          onClick={() => scrollToImage(i)}
        />
      ))}
    </div>
  );

  const handleImageClick = (image) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center w-10/12 sm:max-w-screen-sm mx-auto'>
        <div className='relative flex sm:p-4 sm:bg-base-content rounded-box'>
          <div className='carousel rounded-box'>
            {sliderControl(true)}
            {images.map((img, i) => (
              <div className='size-full carousel-item relative items-center' key={i} ref={refs[i]}>
                <div onClick={() => handleImageClick(img)} className=''>
                  <Image
                    width={400}
                    height={400}
                    src={img.src}
                    className='w-full block cursor-pointer'
                    alt={`Slide ${i}`}
                  />
                  <div className='absolute bottom-0 bg-base-content w-full h-10 bg-opacity-50 flex items-center justify-center text-base-100'>
                    {img.txt}
                  </div>
                </div>
              </div>
            ))}
            {sliderControl(false)}
          </div>
        </div>
        <Dots currentImage={currentImage} scrollToImage={scrollToImage} />
      </div>
      <Lightbox image={lightboxImage} onClose={closeLightbox} />
    </>
  );
};

export default Carousel;
