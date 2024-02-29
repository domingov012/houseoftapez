import {useEffect, useRef} from 'react';
import Filter from '../components/Filter.jsx';
import {Outlet} from '@remix-run/react';
import {Aside} from '../components/Aside.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

export default function ShopLayout(props) {
  const bannerRef = useRef();
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
    // observer.observe(productsRef.current);
  });
  return (
    <section className="shop-section">
      <MobileFilterAside />
      <div className="shop-banner hidden-section" ref={bannerRef}>
        TIENDA
        <div className="banner-bg"></div>
      </div>
      <div className="filters-product-wrapper mt-10">
        <a href="#filter-aside" className="filter-toggle hidden w-fit ml-2">
          FILTRAR
          <FontAwesomeIcon icon={faFilter} className="ml-2" />
        </a>
        <div className="filters-container">
          <Filter />
        </div>
        <div className="shop-grid-container">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

function MobileFilterAside() {
  return (
    <Aside id="filter-aside" header="FILTER MENU">
      <Filter />
    </Aside>
  );
}
