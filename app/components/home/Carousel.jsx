import {useEffect, useState, useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

export default function Carousel({view1, view2}) {
  const [bannerArray, setBannerArray] = useState([view1, view2]);
  const ref1 = useRef();
  const ref2 = useRef();
  const carouselRef = useRef();

  function nextBanner(i) {
    setBannerArray((prev) => {
      let copy = [...prev];
      let first = copy.shift();
      console.log([...copy, first]);
      return [...copy, first];
    });
  }

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="absolute top-[40vh] z-30 text-yellow-300 arrow-icon p-5 cursor-pointer"
        onClick={() => {
          carouselRef.current.scrollLeft -= 1000;
        }}
      />
      <FontAwesomeIcon
        icon={faArrowRight}
        className="absolute top-[40vh] right-0 z-30 text-yellow-300 arrow-icon p-5 cursor-pointer "
        onClick={() => (carouselRef.current.scrollLeft += 1000)}
      />
      <div className="main-banner-carousel" ref={carouselRef}>
        <div className="main-banner-option" ref={ref1}>
          {bannerArray[0]}
        </div>
        <div className="main-banner-option" ref={ref2}>
          {bannerArray[1]}
        </div>
      </div>
      {/* selector */}
      {/* <div className="flex banner-selector border-white border-[3px] rounded-xl">
        <svg width="60" height="24">
          <circle cx="25%" cy="50%" r="6" fill="#e5d201" />
          <circle cx="75%" cy="50%" r="6" fill="white" />
        </svg>
      </div> */}
    </div>
  );
}
