import {Suspense, useState} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData} from '@remix-run/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';

import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
} from '@shopify/hydrogen';

import {getVariantUrl} from '~/lib/variants';
import Feature from '../components/Features.jsx';
import ProductPreview from '~/components/ProductPreview.jsx';
import Ahorros from '../components/Ahorros.jsx';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `HOUSE OF TAPEZ | ${data?.product.title ?? ''}`}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;

  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      // Filter out Shopify predictive search query params
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v') &&
      // Filter out third party tracking params
      !option.name.startsWith('fbclid'),
  );

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // await the query for the critical product data
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  let ahorro_array;
  let pack_products;
  let overview_info_id;
  let feature_id_array;
  if (product?.tags.includes('pack')) {
    // es pack. Pedir productos query.
    pack_products = product.metafields[2]
      ? JSON.parse(product.metafields[2].value)
      : [];

    ahorro_array = JSON.parse(product.metafields[3].value).info;
  } else {
    overview_info_id = product.metafields[1].value;
    feature_id_array = product.metafields[0]
      ? JSON.parse(product.metafields[0].value)
      : [];
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.
  const variants = storefront.query(VARIANTS_QUERY, {
    variables: {handle},
  });

  // overview si no es pack
  const overview = overview_info_id
    ? storefront.query(OVERVIEW_QUERY, {
        variables: {overview_info_id},
      })
    : null;

  // features si no es pack
  const feature_array = feature_id_array
    ? Promise.all(
        feature_id_array.map(async (id) => {
          const feature = storefront.query(FEATURE_QUERY, {
            variables: {id},
          });
          return feature;
        }),
      )
    : [];

  // components si es pack
  const pack_products_array = pack_products
    ? Promise.all(
        pack_products.map(async (id) => {
          console.log('ID : ', id);
          const pack_product = storefront.query(PACK_PRODUCTS_QUERY, {
            variables: {id},
          });
          return pack_product;
        }),
      )
    : [];

  console.log('PACK PRODUCTS: ', pack_products_array);
  return defer({
    product,
    variants,
    overview,
    feature_array,
    pack_products_array,
    ahorro_array,
  });
}

/**
 * @param {{
 *   product: ProductFragment;
 *   request: Request;
 * }}
 */
function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const {
    product,
    variants,
    overview,
    feature_array,
    pack_products_array,
    ahorro_array,
  } = useLoaderData();
  const {selectedVariant, collections} = product;

  let isTape = false;
  collections.nodes.forEach((collection) => {
    if (collection.title === 'TODO TAPES') {
      isTape = true;
    }
  });
  console.log(feature_array);

  return (
    <>
      <div className="product">
        <ProductImageAndInfo
          image={selectedVariant?.image}
          product={product.title}
        />
        <ProductMain
          selectedVariant={selectedVariant}
          product={product}
          variants={variants}
          isTape={isTape}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <Suspense fallback={<div>Cargando Overview</div>}>
          <Await resolve={overview}>
            {(overview) =>
              overview ? (
                <ProductOverview metaobject={overview.metaobject} />
              ) : (
                <></>
              )
            }
          </Await>
        </Suspense>

        <Suspense fallback={<div>Cargando Features...</div>}>
          <Await resolve={feature_array}>
            {(feature_array) => {
              if (feature_array.length > 0) {
                return (
                  <ProductFeatures
                    features={feature_array}
                    product={product.title}
                  />
                );
              }
            }}
          </Await>
        </Suspense>

        <Suspense fallback={<div>Cargando Productos</div>}>
          <Await resolve={pack_products_array}>
            {(pack_products_array) => {
              if (pack_products_array.length > 0) {
                const components = pack_products_array.map((product) => {
                  return (
                    <div className="pack-subproduct-width">
                      <ProductPreview productData={product.product} />
                    </div>
                  );
                });
                return (
                  <div className="flex flex-col mt-20 items-center justify-center">
                    <h1 className="title-font-2 pack-info-title">
                      PACK{' '}
                      <span className="text-[#e5d201]">{product.title}</span>{' '}
                      INCLUYE
                    </h1>
                    <div className="pack-subproducts-wrapper">{components}</div>
                    <Suspense fallback={<div>CARGANDO AHORROS</div>}>
                      <Await resolve={ahorro_array}>
                        {(ahorro_array) => (
                          <Ahorros
                            ahorro_array={ahorro_array}
                            price={selectedVariant.price}
                          />
                        )}
                      </Await>
                    </Suspense>
                  </div>
                );
              }
            }}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

/**
 * @param {{image: ProductVariantFragment['image']}}
 */
function ProductImageAndInfo({image, product}) {
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

function ProductFeatures({features, product}) {
  const features_array = features.map((object, index) => {
    return <Feature index={index} fields={object.metaobject.fields} />;
  });
  return (
    <div className="all-features-container">
      <h1 className="text-4xl text-center m-5 title-font">FEATURES</h1>
      <div className="features-grid">{features_array}</div>
    </div>
  );
}

function ProductOverview({metaobject}) {
  return (
    <div className="overview-container">
      <h1 className="prod-name-title big pr-2">
        ¿QUÉ ES <span className="highlight">{metaobject.fields[2]?.value}</span>
        {'  '}?
      </h1>
      <div className="pl-2">
        <div className="smid text-font">{metaobject.fields[0]?.value}</div>
        <br />
        <div className="smid text-font">{metaobject.fields[1]?.value}</div>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Promise<ProductVariantsQuery>;
 * }}
 */
function ProductMain({selectedVariant, product, variants, isTape}) {
  const {title, descriptionHtml} = product;

  const [discount, setDiscount] = useState(false);

  return (
    <div className="product-main">
      <h1 className="prod-name-title big">{title}</h1>

      <div
        dangerouslySetInnerHTML={{__html: descriptionHtml}}
        className="text-xl prod-description text-font"
      />
      <ProductPrice selectedVariant={selectedVariant} isDiscounted={discount} />
      <br />
      <Suspense
        fallback={
          <ProductForm
            product={product}
            selectedVariant={selectedVariant}
            variants={[]}
          />
        }
      >
        <Await
          errorElement="There was a problem loading product variants"
          resolve={variants}
        >
          {(data) => (
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={data.product?.variants.nodes || []}
              setDiscount={setDiscount}
              isTape={isTape}
            />
          )}
        </Await>
      </Suspense>
      <br />
      <br />

      <br />
    </div>
  );
}

/**
 * @param {{
 *   selectedVariant: ProductFragment['selectedVariant'];
 * }}
 */
function ProductPrice({selectedVariant, isDiscounted}) {
  return (
    <div className="product-price">
      {selectedVariant?.compareAtPrice ? (
        <>
          <p>Sale</p>
          <br />
          <div className="product-price-on-sale">
            {selectedVariant ? <Money data={selectedVariant.price} /> : null}
            <s>
              <Money
                data={selectedVariant.compareAtPrice}
                className="prod-price-expanded mid text-font mt-5"
              />
            </s>
          </div>
        </>
      ) : (
        selectedVariant?.price && (
          <div className="flex items-center">
            <Money
              data={selectedVariant?.price}
              className={`prod-price-expanded mid text-font mt-5 discounted-price-${isDiscounted}`}
            />
            <div className="mid text-font mt-5 ml-2">c/u</div>
          </div>
        )
      )}
      {isDiscounted && (
        <div className="flex items-center">
          <Money
            data={{
              amount: (
                parseInt(selectedVariant?.price.amount) * 0.85
              ).toString(),
              currencyCode: selectedVariant?.price.currencyCode,
            }}
            className="prod-price-expanded mid text-font mt-5"
          />
          <div className="mid text-font mt-5 ml-2">c/u</div>
          <div className="mid text-font mt-5 ml-3 text-red-500">-15% off</div>
        </div>
      )}
    </div>
  );
}

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Array<ProductVariantFragment>;
 * }}
 */
function ProductForm({
  product,
  selectedVariant,
  variants,
  setDiscount,
  isTape,
}) {
  const [quantity, setQuantity] = useState(1);

  function updateQuantity(n) {
    if (n === 1 && selectedVariant.quantityAvailable > quantity) {
      setQuantity((prev) => (prev === 1 && n === -1 ? 1 : prev + n));

      if (quantity + 1 >= 6 && isTape) {
        setDiscount(true);
      }
    } else if (n === -1) {
      setQuantity((prev) => (prev === 1 && n === -1 ? 1 : prev + n));
      if (quantity - 1 < 6 && isTape) {
        setDiscount(false);
      }
    }
  }

  function selectVariant() {
    setQuantity(1);
    setDiscount(false);
  }

  return (
    <div className="product-form">
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => (
          <ProductOptions
            key={option.name}
            option={option}
            onClick={selectVariant}
          />
        )}
      </VariantSelector>
      <br />
      <div className="flex items-center text-3xl">
        <div className="quantity-selector" onClick={() => updateQuantity(-1)}>
          <FontAwesomeIcon icon={faMinus} />
        </div>
        <div className="text-font p-2 text-4xl"> {quantity} </div>
        <div className="quantity-selector" onClick={() => updateQuantity(1)}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      {selectedVariant.quantityAvailable <= 5 && (
        <div className="text-font text-red-500 pb-4">
          {selectedVariant.quantityAvailable !== 0
            ? `Solo quedan ${selectedVariant.quantityAvailable} en stock!`
            : ''}
        </div>
      )}
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          window.location.href = window.location.href + '#cart-aside';
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: quantity,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale
          ? 'AGREGAR AL CARRO'
          : 'SIN STOCK :('}
      </AddToCartButton>
    </div>
  );
}

/**
 * @param {{option: VariantOption}}
 */
function ProductOptions({option, onClick}) {
  return (
    <div className="product-options flex items-center mb-6" key={option.name}>
      <h5 className="text-font mr-4">{option.name}: </h5>
      <div className="product-options-grid">
        {option.values.map(({value, isAvailable, isActive, to}) => {
          return (option.name === 'Color') |
            option.name.includes('TEAR EAB') |
            option.name.includes('SOCK TAPE') ? (
            <Link
              className={`product-options-item color bg-color-${value} active-${isActive}`}
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
              style={{
                opacity: isAvailable ? 1 : 0.3,
                backgroundColor: `${value}`,
              }}
              onClick={onClick}
            ></Link>
          ) : (
            <Link
              className={`product-options-item active-${isActive}`}
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
              style={{
                opacity: isAvailable ? 1 : 0.3,
              }}
              onClick={onClick}
            >
              {value}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: CartLineInput[];
 *   onClick?: () => void;
 * }}
 */
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

const FEATURE_QUERY = `#graphql
  query ProductFeature(
    $country: CountryCode
    $id: ID!
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(id: $id) {
      fields {
        value
      }
    }
  }
  `;

const OVERVIEW_QUERY = `#graphql
  query ProductOverview(
    $country: CountryCode
    $overview_info_id: ID!
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    metaobject(id: $overview_info_id) {
      fields {
        value
      }
    }
  }
  `;

const PACK_PRODUCTS_QUERY = `#graphql
  query FindPackProduct(
    $country: CountryCode
    $id: ID!
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(id: $id) {
      handle
      images(first: 10) {
        nodes {
          height
          id
          url
          width
        }
      }
      title
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }`;

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    quantityAvailable
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    collections(first: 5) {
      nodes {
        title
      }
    }
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
    metafields(identifiers:  [{key: "features", namespace: "custom"}, {key: "product_overview", namespace: "custom"}, {key: "pack_products", namespace: "custom"}, {key: "ahorros", namespace: "custom"}] ) {
      value
    }
    tags
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@remix-run/react').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantsQuery} ProductVariantsQuery */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
/** @typedef {import('@shopify/hydrogen').VariantOption} VariantOption */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineInput} CartLineInput */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').SelectedOption} SelectedOption */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
