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
  const storeRef = useRef();
  const tapeRef = useRef();

  function revealMenu(e, ref) {
    if (e) {
      ref.current.classList.remove('h-12');
      ref.current.classList.add('h-fit');
    } else {
      ref.current.classList.remove('h-fit');
      ref.current.classList.add('h-12');
    }
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
        <div className="flex flex-col h-3/4 ml-6">
          <div
            ref={storeRef}
            className="h-12 overflow-hidden transition-all"
            onMouseEnter={() => revealMenu(true, storeRef)}
            onMouseLeave={() => revealMenu(false, storeRef)}
          >
            <div className="drop-down">TIENDA</div>
            <div className="pl-7 mt-3 mb-3 border-l-2 border-[#e5d201]">
              <div
                ref={tapeRef}
                className="h-12 overflow-hidden"
                onMouseEnter={() => revealMenu(true, tapeRef)}
                onMouseLeave={() => revealMenu(false, tapeRef)}
              >
                <div className="drop-down">TAPES</div>
                <div className="pl-7 mt-3 mb-3 border-l-2 border-[#e5d201] max-h-36 overflow-auto">
                  <NavLink
                    prefetch="intent"
                    to="/products/k-tape"
                    className="nav-menu-item text-font"
                  >
                    K-TAPE
                  </NavLink>
                  <NavLink
                    prefetch="intent"
                    to="/products/zinc-oxide"
                    className="nav-menu-item-option text-font mr-auto"
                  >
                    ZINC OXIDE WHITE
                  </NavLink>
                  <NavLink
                    prefetch="intent"
                    to="/products/zinc-oxide-tan"
                    className="nav-menu-item-option text-font mr-auto"
                  >
                    ZINC OXIDE TAN
                  </NavLink>
                  <NavLink
                    prefetch="intent"
                    to="/products/eab-tear"
                    className="nav-menu-item text-font mr-auto"
                  >
                    TEAR EAB
                  </NavLink>
                  <NavLink
                    prefetch="intent"
                    to="/products/non-tear-eab"
                    className="nav-menu-item text-font mr-auto"
                  >
                    NON-TEAR EAB
                  </NavLink>
                  <NavLink
                    prefetch="intent"
                    to="/products/coban"
                    className="nav-menu-item text-font"
                  >
                    COHESIVE BANDAGE
                  </NavLink>
                  <NavLink
                    prefetch="intent"
                    to="/products/fixation-tape"
                    className="nav-menu-item text-font"
                  >
                    FIXATION TAPE
                  </NavLink>
                </div>
              </div>
              <div className="drop-down">PACKS</div>
              <div className="drop-down">CATEGORIAS</div>
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
          <NavLink prefetch="intent" to="/tutorials" className="drop-down">
            TUTORIALES
          </NavLink>
          <NavLink prefetch="intent" className="drop-down">
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
