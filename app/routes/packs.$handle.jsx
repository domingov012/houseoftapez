import {defer, json, useLoaderData} from '@remix-run/react';
import {Image, Money, CartForm} from '@shopify/hydrogen';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
// export const meta = ({data}) => {
//   return [{title: `HOUSE OF TAPEZ | ${data?.product.title ?? ''}`}];
// };

export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // await pack data
  const data = await storefront.query(PACK_QUERY, {
    variables: {handle},
  });

  const pack = data.product;
  // if (!product?.id) {
  //   throw new Response(null, {status: 404});
  // }

  return defer({pack});
}

export default function Packs() {
  const {pack} = useLoaderData();
  // const {metafield} = pack;
  console.log('pack: ', pack);

  const variant = pack.variants.nodes[0];
  console.log('variant: ', variant);

  return (
    <>
      <div className="product">
        <PackImage image={pack.featuredImage} pack={pack.title} />
        <PackMain pack={pack} variant={variant} />
      </div>
    </>
  );
}

function PackImage({image, pack}) {
  if (!image) {
    return <div className="product-image" />;
  }

  return (
    <div className="product-image">
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 40vw, 100vw"
      />
    </div>
  );
}

function PackMain({pack, variant}) {
  const {descriptionHtml, title} = pack;

  function hola(e) {
    return e;
  }
  return (
    <div className="product-main">
      <h1 className="prod-name-title big">{title}</h1>

      <div
        dangerouslySetInnerHTML={{__html: descriptionHtml}}
        className="text-xl prod-description text-font"
      />

      <PackPrice price={pack.priceRange} isDiscounted={false} />
      <PackForm pack={pack} setDiscount={hola} variant={variant} />
    </div>
  );
}

function PackPrice({price, isDiscounted}) {
  return (
    <div className="product-price">
      {price?.minVariantPrice && (
        <div className="flex items-center">
          <Money
            data={price.minVariantPrice}
            className={`prod-price-expanded mid text-font mt-5 discounted-price-${isDiscounted}`}
          />
        </div>
      )}
      {isDiscounted && (
        <div className="flex items-center">
          <Money
            data={{
              amount: (parseInt(price.minVariantPrice.amount) * 0.8).toString(),
              currencyCode: price.minVariantPrice.currencyCode,
            }}
            className="prod-price-expanded mid text-font mt-5"
          />
          <div className="mid text-font mt-5 ml-2">c/u</div>
          <div className="mid text-font mt-5 ml-3 text-red-500">-20% off</div>
        </div>
      )}
    </div>
  );
}

function PackForm({pack, setDiscount, variant}) {
  const [quantity, setQuantity] = useState(1);

  function updateQuantity(n) {
    if (n === 1 && pack.totalInventory > quantity) {
      setQuantity((prev) => (prev === 1 && n === -1 ? 1 : prev + n));

      if (quantity + 1 >= 4 && isTape) {
        setDiscount(true);
      }
    } else if (n === -1) {
      setQuantity((prev) => (prev === 1 && n === -1 ? 1 : prev + n));
      if (quantity - 1 < 4 && isTape) {
        setDiscount(false);
      }
    }
  }

  return (
    <div className="product-form">
      <div className="flex items-center text-3xl">
        <div className="quantity-selector" onClick={() => updateQuantity(-1)}>
          <FontAwesomeIcon icon={faMinus} />
        </div>
        <div className="text-font p-2 text-4xl"> {quantity} </div>
        <div className="quantity-selector" onClick={() => updateQuantity(1)}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      {pack.totalInventory <= 5 && (
        <div className="text-font text-red-500 pb-4">
          {pack.totalInventory !== 0
            ? `Solo quedan ${pack.totalInventory} en stock!`
            : ''}
        </div>
      )}
      <AddToCartButton
        disabled={!pack || !pack.availableForSale}
        onClick={() => {
          window.location.href = window.location.href + '#cart-aside';
        }}
        lines={
          variant
            ? [
                {
                  merchandiseId: variant.id,
                  quantity: quantity,
                },
              ]
            : []
        }
      >
        {pack?.availableForSale ? 'AGREGAR AL CARRO' : 'SIN STOCK :('}
      </AddToCartButton>
    </div>
  );
}

function AddToCartButton({analytics, children, disabled, lines, onClick}) {
  const className = children === 'AGREGAR AL CARRO' ? 'add-button' : 'no-stock';
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            className={className}
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
}

const PACK_QUERY = `#graphql
    query PackProduct(
        $country: CountryCode
        $handle: String!
        $language: LanguageCode
    ) @inContext(country: $country, language: $language) {
        product(handle: $handle) {
            id
            tags
            title
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              altText
              height
              id
              url
              width
            }
            descriptionHtml
            metafields(identifiers: {key: "pack_products", namespace: "custom"}) {
                value
            }
            totalInventory
            availableForSale
            variants(first: 10) {
              nodes {
                id
                price {
                  amount
                  currencyCode
                }
              }
            }
        }
    }`;
