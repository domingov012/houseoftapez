import {Await, Link, NavLink} from '@remix-run/react';
import {Suspense, useRef, useState} from 'react';
import {useRootLoaderData} from '~/root';
import {Image} from '@shopify/hydrogen';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faSearch,
  faUser,
  faTags,
  faTruckFast,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import DropMenu from '../components/DropMenu.jsx';
import MobileMenu from '../components/MobileMenu.jsx';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart}) {
  const {shop, menu} = header;
  shop.brand.logo.image.height = '100';
  console.log('IMAGE DATA ', shop.brand.logo.image);
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const shopMenuRef = useRef();
  const mobileMenuRef = useRef();

  function handleMenuDisplay() {
    shopMenuRef.current.classList.remove('h-0');
    shopMenuRef.current.classList.add('h-[65vh]');
  }

  function closeMenu() {
    shopMenuRef.current.classList.remove('h-[65vh]');
    shopMenuRef.current.classList.add('h-0');
  }

  function toggleMenu() {
    if (!showMenuMobile) {
      mobileMenuRef.current.classList.add('mobile-menu-visible');
    } else {
      mobileMenuRef.current.classList.remove('mobile-menu-visible');
    }
    setShowMenuMobile((prev) => !prev);
  }

  return (
    <header className="navbar relative">
      <div className="news-display-container">
        <div className="news whitespace-nowrap">
          <div className="scrolling-text flex">
            <div className="ml-auto mr-auto text-black whitespace-nowrap">
              <FontAwesomeIcon icon={faTags} className="mr-2" />
              15% off al llevar 6 tapes del mismo tipo
            </div>
            <div className="ml-auto mr-auto min-w-10 text-black"> | </div>
            <div className="ml-auto mr-auto text-black whitespace-nowrap">
              <FontAwesomeIcon icon={faTruck} className="mr-2" />
              Envío gratis en compras sobre CLP 50.000
            </div>
            <div className="ml-auto mr-auto min-w-10 text-black"> | </div>
            <div className="ml-auto mr-auto text-black whitespace-nowrap">
              <FontAwesomeIcon icon={faTruckFast} className="mr-2" />
              Envíos express el mismo día (pedir antes de las 10AM)
            </div>
          </div>
        </div>
      </div>
      <div className="main-nav">
        <HeaderMenuMobileToggle action={toggleMenu} />
        <div className="logo-container-1">
          <Link prefetch="intent" to="/">
            <Image
              data={shop.brand.logo.image}
              className="logo"
              aspectRatio="1577:499"
              sizes="100%"
            />
          </Link>
        </div>
        <div className="drop-down-menu">
          <NavLink
            prefetch="intent"
            to="/shop"
            className="drop-down"
            onMouseEnter={() => handleMenuDisplay()}
          >
            TIENDA
          </NavLink>
          <NavLink prefetch="intent" to="/tutorials" className="drop-down">
            TUTORIALES
          </NavLink>
          <NavLink prefetch="intent" to="/contacto" className="drop-down">
            CONTACTO
          </NavLink>
        </div>
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
      <DropMenu
        reference={shopMenuRef}
        onLeave={closeMenu}
        onClick={closeMenu}
      />
      <MobileMenu reference={mobileMenuRef} closeMenu={toggleMenu} />
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 * }}
 */
export function HeaderMenu({menu, primaryDomainUrl, viewport}) {
  const {publicStoreDomain} = useRootLoaderData();
  const className = `header-menu-${viewport}`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="drop-down"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      {/* <NavLink prefetch="intent" to="/account" className="icon-action">
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) =>
              isLoggedIn ? (
                <label className="icon-label">Account</label>
              ) : (
                <label className="icon-label">Sign in</label>
              )
            }
          </Await>
          <FontAwesomeIcon icon={faUser} className="icon" />
        </Suspense>
      </NavLink> */}
      {/* <SearchToggle /> */}
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle({action}) {
  return (
    <a className="header-menu-mobile-toggle" onClick={action}>
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return (
    <a href="#search-aside" className="icon-action">
      <label className="icon-label">Search</label>
      <FontAwesomeIcon icon={faSearch} className="icon" />
    </a>
  );
}

/**
 * @param {{count: number}}
 */
function CartBadge({count}) {
  return (
    <a href="#cart-aside" className="relative icon-action">
      <label className="icon-label">Cart: {count}</label>
      <FontAwesomeIcon icon={faCartShopping} className="icon" />
      {count > 0 && <div className="absolute cart-count-notif">{count}</div>}
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>} HeaderProps */
/** @typedef {'desktop' | 'mobile'} Viewport */

/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('./Layout').LayoutProps} LayoutProps */
