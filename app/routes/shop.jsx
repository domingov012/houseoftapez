import {useEffect, useRef} from 'react';
import ProductPreview from '../components/ProductPreview.jsx';
import {Outlet} from '@remix-run/react';

export default function ShopLayout(props) {
  const bannerRef = useRef();
  const filterRef = useRef();
  const productsRef = useRef();

  // SCROLL ANIMATIONS //
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible-section');
        }
      });
    });
    observer.observe(bannerRef.current);
    observer.observe(filterRef.current);
    // observer.observe(productsRef.current);
  });
  return (
    <section className="shop-section">
      <div className="shop-banner hidden-section" ref={bannerRef}>
        TIENDA
        <div className="banner-bg"></div>
      </div>
      <div
        className="tape-type-selector-container hidden-section"
        ref={filterRef}
      >
        <div className="type-option">
          K-Tape
          <div className="type-bg"></div>
        </div>
        <div className="type-option">
          EAB
          <div className="type-bg"></div>
        </div>
        <div className="type-option">
          Zinc Oxide
          <div className="type-bg"></div>
        </div>
        <div className="type-option">
          Accesories
          <div className="type-bg"></div>
        </div>
        <div className="type-option">
          Packs
          <div className="type-bg"></div>
        </div>
      </div>
      <Outlet />
    </section>
  );
}
