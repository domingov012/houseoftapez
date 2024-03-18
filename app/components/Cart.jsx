import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Link, useNavigation} from '@remix-run/react';
import {useVariantUrl} from '~/lib/variants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import Spinner from './ui/Spinner.jsx';

/**
 * @param {CartMainProps}
 */
export function CartMain({layout, cart}) {
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;

  return !linesCount ? (
    <div className={`${className}`}>
      <CartEmpty hidden={linesCount} layout={layout} />
    </div>
  ) : (
    <>
      <CartDetails cart={cart} layout={layout} />
    </>
  );
}

/**
 * @param {CartMainProps}
 */
function CartDetails({layout, cart}) {
  const cartHasItems = !!cart && cart.totalQuantity > 0;

  return (
    <div className={`cart-details-${layout}`}>
      <CartLines lines={cart?.lines} layout={layout} />
      {cartHasItems && (
        <CartSummary cost={cart.cost} layout={layout}>
          <CartDiscounts discountCodes={cart.discountCodes} layout={layout} />
          <CartCheckoutActions checkoutUrl={cart.checkoutUrl} layout={layout} />
        </CartSummary>
      )}
    </div>
  );
}

/**
 * @param {{
 *   layout: CartMainProps['layout'];
 *   lines: CartApiQueryFragment['lines'] | undefined;
 * }}
 */
function CartLines({lines, layout}) {
  if (!lines) return null;

  return (
    <div aria-labelledby={`cart-lines-${layout}`}>
      <ul className="flex flex-col items-center pb-3">
        {lines.nodes.map((line) => (
          <CartLineItem key={line.id} line={line} layout={layout} />
        ))}
      </ul>
    </div>
  );
}

/**
 * @param {{
 *   layout: CartMainProps['layout'];
 *   line: CartLine;
 * }}
 */
function CartLineItem({layout, line}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions, quantityAvailable} =
    merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const height = layout === 'page' ? 'h-[20vh]' : '';

  const [h, w] = layout === 'aside' ? [150, 150] : ['20vw', '20vw'];
  const margin = layout === 'page' ? 'ml-6' : '';
  return (
    <li key={id} className="cart-line w-[90%]">
      {image && (
        <Image
          alt={title}
          aspectRatio="1/1"
          data={image}
          height={h}
          loading="lazy"
          width={w}
          className="rounded"
        />
      )}

      <div className={`flex flex-col w-full ${height} ${margin}`}>
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={() => {
            if (layout === 'aside') {
              // close the drawer
              window.location.href = lineItemUrl;
            }
          }}
        >
          <p>
            <strong className="title-font-1 text-xl">{product.title}</strong>
          </p>
        </Link>
        <CartLinePrice layout={layout} line={line} as="span" />
        {/* <ul>
          {selectedOptions.map((option) => (
            <li key={option.name}>
              <small>
                {option.name}: {option.value}
              </small>
            </li>
          ))}
        </ul> */}
        <CartLineQuantity
          layout={layout}
          line={line}
          maxQ={quantityAvailable}
        />
      </div>
    </li>
  );
}

/**
 * @param {{checkoutUrl: string}}
 */
function CartCheckoutActions({checkoutUrl, layout}) {
  if (!checkoutUrl) return null;

  const margin = layout === 'page' ? 'mt-auto' : 'mt-4';
  return (
    <div className={`self-end ${margin}`}>
      <a href={checkoutUrl} target="_self">
        <p className="text-font nav-menu-button">Completar pedido &rarr;</p>
      </a>
      <br />
    </div>
  );
}

/**
 * @param {{
 *   children?: React.ReactNode;
 *   cost: CartApiQueryFragment['cost'];
 *   layout: CartMainProps['layout'];
 * }}
 */
export function CartSummary({cost, layout, children = null}) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    <div aria-labelledby="cart-summary" className={className}>
      <h4 className="title-font-1 mb-2">RESUMEN DE CARRITO</h4>
      <dl className="cart-subtotal">
        <dt className="text-font">Sub-total: </dt>
        <dd className="ml-auto">
          {cost?.subtotalAmount?.amount ? (
            <Money data={cost?.subtotalAmount} className="text-font" />
          ) : (
            '-'
          )}
        </dd>
      </dl>
      {children}
    </div>
  );
}

/**
 * @param {{lineIds: string[]}}
 */
function CartLineRemoveButton({lineIds}) {
  const [removing, setRemoving] = useState(false);

  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        className="text-red-500"
        type="submit"
        onClick={() => setRemoving(true)}
      >
        {removing ? (
          <Spinner color="text-red-500" />
        ) : (
          <FontAwesomeIcon icon={faTrashCan} />
        )}
      </button>
    </CartForm>
  );
}

/**
 * @param {{line: CartLine}}
 */
function CartLineQuantity({line, maxQ, layout}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));
  const [isLoading, setIsLoading] = useState(false);
  const [stockMessage, setStockMessage] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [quantity]);

  function decreaseQuantityLoader() {
    setIsLoading(true);
    setStockMessage(false);
  }

  function increaseQuantityLoader() {
    if (quantity < maxQ) {
      setIsLoading(true);
    } else {
      setStockMessage(true);
    }
  }

  return (
    <>
      <div className={`cart-line-quantity-${layout} flex w-full`}>
        {/* <div>Cantidad: &nbsp;&nbsp;</div> */}
        <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            name="decrease-quantity"
            value={prevQuantity}
            className="quantity-selector"
            onClick={decreaseQuantityLoader}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </CartLineUpdateButton>
        <div className="text-xl flex text-font items-center ml-2 mr-2">
          {isLoading ? (
            <Spinner h="20" w="20" color="text-[#e5d201]" />
          ) : (
            quantity
          )}
        </div>
        <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            aria-label="Increase quantity"
            name="increase-quantity"
            value={nextQuantity}
            // disabled={quantity === }
            className="quantity-selector"
            onClick={increaseQuantityLoader}
            // onClick={() => console.log(nextQuantity)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </CartLineUpdateButton>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <CartLineRemoveButton lineIds={[lineId]} />
      </div>
      {stockMessage && (
        <div className="text-font text-xs text-red-500">
          no hay stock para agragar mas cantidad
        </div>
      )}
    </>
  );
}

/**
 * @param {{
 *   line: CartLine;
 *   priceType?: 'regular' | 'compareAt';
 *   [key: string]: any;
 * }}
 */
function CartLinePrice({line, priceType = 'regular', ...passthroughProps}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return (
    <div>
      <Money
        withoutTrailingZeros
        {...passthroughProps}
        data={moneyV2}
        className="text-font"
      />
    </div>
  );
}

/**
 * @param {{
 *   hidden: boolean;
 *   layout?: CartMainProps['layout'];
 * }}
 */
export function CartEmpty({hidden = false, layout = 'aside'}) {
  return (
    <div hidden={hidden} className="self-center justify-center">
      <br />
      <p className="text-font">EL CARRITO ESTA VACÍO...</p>
      <br />
      <Link
        to="/shop"
        onClick={() => {
          if (layout === 'aside') {
            window.location.href = '/shop';
          }
        }}
        className="nav-menu-button text-font"
      >
        VISITA NUESTRA TIENDA →
      </Link>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes: CartApiQueryFragment['discountCodes'];
 * }}
 */
function CartDiscounts({discountCodes, layout}) {
  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  const margin = layout === 'page' ? 'mt-auto' : '';
  const textSize = layout === 'page' ? '16px' : '10px';
  return (
    <div className={margin}>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="cart-discount">
              <code>{codes?.join(', ')}</code>
              &nbsp;
              <button>Remove</button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className="flex flex-col mt-3">
          <label className={`text-font text-[${textSize}] text-[#e5d201]`}>
            ¿Parte de un club? Introduce su código:
          </label>
          <div className="mt-4">
            <input
              type="text"
              name="discountCode"
              placeholder="CÓDIGO"
              className="text-font bg-transparent border border-transparent outline-none rounded-sm p-1 focus:border-[#e5d201]"
            />
            &nbsp;
            <button
              className=" transition-colors hover:text-[#e5d201c6] ml-5"
              type="submit"
            >
              PROBAR
            </button>
          </div>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: string[];
 *   children: React.ReactNode;
 * }}
 */
function UpdateDiscountForm({discountCodes, children}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

/**
 * @param {{
 *   children: React.ReactNode;
 *   lines: CartLineUpdateInput[];
 * }}
 */
function CartLineUpdateButton({children, lines}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/** @typedef {CartApiQueryFragment['lines']['nodes'][0]} CartLine */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: 'page' | 'aside';
 * }} CartMainProps
 */

/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
