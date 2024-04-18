import {NavLink} from '@remix-run/react';
import {useRootLoaderData} from '~/root';
import hotLogo from '../styles/sporttape_svg.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
/**
 * @param {FooterQuery & {shop: HeaderQuery['shop']}}
 */
export function Footer({menu, shop}) {
  return (
    <footer className="footer">
      <div className="min-h-[20vh]"></div>
      <div className="footer-layout">
        <div className="footer-logos">
          <img src={hotLogo} className="w-1/3 rotate-12" />
          <img
            src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/X_Sticker_Yellow.png?v=1709827477"
            className="w-2/3"
          />
          <div className="text-font text-center text-[12px] pl-5 pr-5">
            HOUSE OF TAPEZ distribuidor oficial de SPORTTAPE en Chile
          </div>
        </div>
        <div className="footer-menu">
          <h1 className="title-font-2">MENU</h1>
          <div className="text-font"></div>
          <h2 className="text-font">TAPEZ</h2>
          <h2 className="text-font">CATEGORÍAS</h2>
          <NavLink
            prefetch="intent"
            to="/products/k-tape"
            className="hover:text-[#e5d201] text-font text-sm"
          >
            K-TAPE
          </NavLink>
          <NavLink
            prefetch="intent"
            to="shop/category/tape-elasticos"
            className="hover:text-[#e5d201] text-font text-sm"
          >
            ELÁSTICOS
          </NavLink>
          <NavLink
            prefetch="intent"
            to="/products/zinc-oxide-tan"
            className="hover:text-[#e5d201] text-font text-sm"
          >
            ZINC OXIDE TAN
          </NavLink>
          <NavLink
            prefetch="intent"
            to="shop/category/tape-rigidos"
            className="hover:text-[#e5d201] text-font text-sm"
          >
            RÍGIDOS
          </NavLink>
          <NavLink
            prefetch="intent"
            to="/products/eab-tear"
            className="hover:text-[#e5d201] text-font text-sm"
          >
            EAB TEAR
          </NavLink>
          <NavLink
            prefetch="intent"
            to="shop/category/Accesorios"
            className="hover:text-[#e5d201] text-font text-sm"
          >
            ACCESORIOS
          </NavLink>
          <NavLink
            prefetch="intent"
            to="/products/coban"
            className="hover:text-[#e5d201] text-font text-sm"
          >
            COBAN
          </NavLink>
          <NavLink
            prefetch="intent"
            to="shop/category/packs"
            className="hover:text-[#e5d201] text-font text-sm"
          >
            PACKS
          </NavLink>
        </div>
        <div className="footer-menu-info title-font-2 max-h-[60%]">
          <h1>INFORMACIÓN</h1>
          <h2>CONTACTO</h2>
          <div className="flex">
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-xl text-[#e5d201] mr-4"
            />
            <a
              className="hover:text-[#e5d201] text-font"
              href="https://www.instagram.com/houseoftapez?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            >
              @houseoftapez
            </a>
          </div>
          <div className="flex items-center h-10">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-xl text-[#e5d201] mr-4"
            />
            <a className="hover:text-[#e5d201] text-font">
              houseoftapez@gmail.com
            </a>
          </div>
        </div>
        <div className="footer-logos-mobile">
          <div className="flex pl-11">
            <img src={hotLogo} className="w-1/3 rotate-12" />
            <img
              src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/X_Sticker_Yellow.png?v=1709827477"
              className="w-2/3"
            />
          </div>
          <div className="text-font text-center text-[12px] pl-5 pr-5">
            HOUSE OF TAPEZ distribuidor oficial de SPORTTAPE en Chile.
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 * }}
 */
function FooterMenu({menu, primaryDomainUrl}) {
  const {publicStoreDomain} = useRootLoaderData();

  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
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
    color: isPending ? 'grey' : 'white',
  };
}

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
