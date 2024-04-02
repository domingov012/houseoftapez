import {Await, NavLink} from '@remix-run/react';
import {Suspense, useRef, useState} from 'react';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/Cart';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';

/**
 * @param {LayoutProps}
 */
export function Layout({cart, children = null, footer, header, isLoggedIn}) {
  return (
    <>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside menu={header?.menu} shop={header?.shop} />
      {header && <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />}
      <main>{children}</main>
      <Suspense>
        <Await resolve={footer}>
          {(footer) => <Footer menu={footer?.menu} shop={header?.shop} />}
        </Await>
      </Suspense>
    </>
  );
}

// ----------------------- CART ASIDE TO CHECK THE CART ANYWHERE ------------------------ //

/**
 * @param {{cart: LayoutProps['cart']}}
 */
function CartAside({cart}) {
  return (
    <Aside id="cart-aside" heading="CARRITO">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button
                onClick={() => {
                  window.location.href = inputRef?.current?.value
                    ? `/search?q=${inputRef.current.value}`
                    : `/search`;
                }}
              >
                Search
              </button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

/**
 * @param {{
 *   menu: HeaderQuery['menu'];
 *   shop: HeaderQuery['shop'];
 * }}
 */
function MobileMenuAside({menu, shop}) {
  const [storeTouched, setStoreTouched] = useState(false);
  const [tapeTouched, settapeTouched] = useState(false);
  const [categoryTouched, setcategoryTouched] = useState(false);
  const storeRef = useRef();
  const tapeRef = useRef();
  const categoryRef = useRef();

  function revealMenu(ref, state, setTouched) {
    if (state) {
      ref.current.classList.remove('h-fit');
      ref.current.classList.add('h-12');
    } else {
      ref.current.classList.remove('h-12');
      ref.current.classList.add('h-fit');
    }
    setTouched((prev) => !prev);
  }

  function closeAside(event) {
    setStoreTouched(false);
    settapeTouched(false);
    setcategoryTouched(false);
    event.preventDefault();
    window.location.href = event.currentTarget.href;
  }
  return (
    menu &&
    shop?.primaryDomain?.url && (
      <Aside id="mobile-menu-aside" heading="MENU">
        {/* <HeaderMenu
          menu={menu}
          viewport="mobile"
          primaryDomainUrl={shop.primaryDomain.url}
        /> */}
        <div className="flex flex-col h-3/4 ml-6 gap-4">
          <div ref={storeRef} className="h-12 overflow-hidden">
            <div
              className="drop-down"
              onTouchStart={() =>
                revealMenu(storeRef, storeTouched, setStoreTouched)
              }
            >
              TIENDA
            </div>
            <div className="pl-7 mt-3 mb-3 border-l-2 border-[#e5d201]  bg-black bg-opacity-35 w-full">
              <div className="h-12 overflow-hidden">
                <NavLink
                  onTouchStart={closeAside}
                  className="drop-down"
                  prefetch="intent"
                  to="/shop"
                >
                  VER TODO
                </NavLink>
              </div>
              <div ref={tapeRef} className="h-12 overflow-hidden">
                <div
                  className="drop-down"
                  onTouchStart={() =>
                    revealMenu(tapeRef, tapeTouched, settapeTouched)
                  }
                >
                  TAPES
                </div>
                <div className="pl-7 mt-3 mb-3 border-l-2 border-[#e5d201] max-h-36 overflow-auto bg-black bg-opacity-45">
                  <NavLink
                    onTouchStart={closeAside}
                    prefetch="intent"
                    to="/shop"
                    className="nav-menu-item text-font text-[#e5d201]"
                  >
                    VER TODOS
                  </NavLink>
                  <NavLink
                    onTouchStart={closeAside}
                    prefetch="intent"
                    to="/products/k-tape"
                    className="nav-menu-item text-font"
                  >
                    K-TAPE
                  </NavLink>
                  <NavLink
                    onTouchStart={closeAside}
                    prefetch="intent"
                    to="/products/zinc-oxide"
                    className="nav-menu-item-option text-font mr-auto"
                  >
                    ZINC OXIDE WHITE
                  </NavLink>
                  <NavLink
                    onTouchStart={closeAside}
                    prefetch="intent"
                    to="/products/zinc-oxide-tan"
                    className="nav-menu-item-option text-font mr-auto"
                  >
                    ZINC OXIDE TAN
                  </NavLink>
                  <NavLink
                    onTouchStart={closeAside}
                    prefetch="intent"
                    to="/products/eab-tear"
                    className="nav-menu-item text-font mr-auto"
                  >
                    TEAR EAB
                  </NavLink>
                  <NavLink
                    onTouchStart={closeAside}
                    prefetch="intent"
                    to="/products/non-tear-eab"
                    className="nav-menu-item text-font mr-auto"
                  >
                    NON-TEAR EAB
                  </NavLink>
                  <NavLink
                    onTouchStart={closeAside}
                    prefetch="intent"
                    to="/products/coban"
                    className="nav-menu-item text-font"
                  >
                    COHESIVE BANDAGE
                  </NavLink>
                  <NavLink
                    onTouchStart={closeAside}
                    prefetch="intent"
                    to="/products/fixation-tape"
                    className="nav-menu-item text-font"
                  >
                    FIXATION TAPE
                  </NavLink>
                </div>
              </div>
              <div ref={categoryRef} className="h-12 overflow-hidden">
                <div
                  className="drop-down"
                  onTouchStart={() =>
                    revealMenu(categoryRef, categoryTouched, setcategoryTouched)
                  }
                >
                  CATEGORÍAS
                </div>
                <div className="pl-7 mt-3 mb-3 border-l-2 border-[#e5d201] max-h-36 overflow-auto">
                  <NavLink
                    onTouchStart={closeAside}
                    prefetch="intent"
                    className="nav-menu-item text-font"
                    to="/shop/category/tape-elasticos"
                  >
                    Elásticos
                  </NavLink>
                  <NavLink
                    onTouchStart={closeAside}
                    prefetch="intent"
                    className="nav-menu-item text-font"
                    to="/shop/category/tape-rigidos"
                  >
                    No elásticos
                  </NavLink>
                  <NavLink
                    onTouchStart={closeAside}
                    prefetch="intent"
                    className="nav-menu-item text-font"
                    to="/shop/category/Accesorios"
                  >
                    Accesorios
                  </NavLink>
                  <NavLink
                    onTouchStart={closeAside}
                    prefetch="intent"
                    className="nav-menu-item text-font text-[#e5d201]"
                    to="/shop/category/packs"
                  >
                    Packs
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          {/* <NavLink
            prefetch="intent"
            to="/shop"
            className="drop-down"
            onMouseEnter={() => handleMenuDisplay()}
          >
            TIENDA
          </NavLink> */}
          <NavLink
            onTouchStart={closeAside}
            prefetch="intent"
            to="/tutorials"
            className="drop-down"
          >
            TUTORIALES
          </NavLink>
          <NavLink
            onTouchStart={closeAside}
            prefetch="intent"
            className="drop-down"
            to="/contacto"
          >
            CONTACTO
          </NavLink>
        </div>
      </Aside>
    )
  );
}

/**
 * @typedef {{
 *   cart: Promise<CartApiQueryFragment | null>;
 *   children?: React.ReactNode;
 *   footer: Promise<FooterQuery>;
 *   header: HeaderQuery;
 *   isLoggedIn: Promise<boolean>;
 * }} LayoutProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
