import {useEffect, useState} from 'react';

export default function Carousel({view1, view2}) {
  const [bannerArray, setBannerArray] = useState([view1, view2]);

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
      <div className="main-banner-carousel">
        <div className="main-banner-option">{bannerArray[0]}</div>
        <div className="main-banner-option">{bannerArray[1]}</div>
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
