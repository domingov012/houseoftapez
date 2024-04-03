import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useRef, useEffect} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import SportTapeSection from '~/components/home/SportTapeSection.jsx';
import ProductPreview from '~/components/ProductPreview';
import TutorialsSection from '~/components/home/TutorialsSection';
import PacksBanner from '~/components/home/PacksBanner';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'HOUSE OF TAPEZ | INICIO'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const {storefront} = context;
  // const {collections} = await storefront.query(POPULAR_PRODUCTS_QUERY);
  // const popularProducts = collections.nodes[0];
  const popularProducts = await storefront.query(POPULAR_PRODUCTS_QUERY);
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({
    popularProducts,
    recommendedProducts,
  });
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  const refSTS = useRef();
  const refPopular = useRef();
  const refTutorial = useRef();
  const refPacks = useRef();
  const refRecommend = useRef();
  const contactRef = useRef();

  // SCROLL ANIMATIONS //
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible-section');
        }
      });
    });
    observer.observe(refSTS.current);
    observer.observe(refPopular.current);
    observer.observe(refTutorial.current);
    observer.observe(refPacks.current);
    observer.observe(refRecommend.current);
    observer.observe(contactRef.current);
  }, []);
  return (
    <div>
      <SportTapeSection reference1={refSTS} reference2={contactRef} />
      <Popular reference={refPopular} products={data.popularProducts} />
      <TutorialsSection reference={refTutorial} />
      <PacksBanner reference={refPacks} />
      <RecommendedProducts
        reference={refRecommend}
        products={data.recommendedProducts}
      />
    </div>
  );
}

function Popular({reference, products}) {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const refArray = [ref1, ref2, ref3, ref4];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible-section');
        } else {
          entry.target.classList.remove('visible-section');
        }
      });
    });
    observer.observe(ref1.current);
    observer.observe(ref2.current);
    observer.observe(ref3.current);
    observer.observe(ref4.current);
  }, []);
  console.log('popular-component', products.collection.products.edges[0]);
  return (
    <section ref={reference} className="half-container hidden-section">
      <div className="popular-container">
        <div className="title-banner">LOS MÁS VENDIDOS</div>
        <div className="products-container">
          {products.collection.products.edges.map((product, index) => (
            <div
              key={product.node.id}
              ref={refArray[index]}
              className="prod hidden-prod"
            >
              <ProductPreview productData={product.node} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery>;
 * }}
 */
function RecommendedProducts({reference, products}) {
  console.log('recommended: ', products);
  return (
    <section
      ref={reference}
      className="half-container recommended-products hidden-section"
    >
      <div className="title-banner">RECOMENDADOS</div>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="products-container-no-blur">
              {products.nodes.map((product) => (
                <div key={product.id} className="prod">
                  <ProductPreview productData={product} />
                </div>
                // <Link
                //   key={product.id}
                //   className="recommended-product"
                //   to={`/products/${product.handle}`}
                // >
                //   <Image
                //     data={product.images.nodes[0]}
                //     aspectRatio="1/1"
                //     sizes="(min-width: 45em) 20vw, 50vw"
                //   />
                //   <h4>{product.title}</h4>
                //   <small>
                //     <Money data={product.priceRange.minVariantPrice} />
                //   </small>
                // </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </section>
  );
}

const POPULAR_PRODUCTS_QUERY = `#graphql
  query popularProducts ($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collection(handle: "populares") {
      products(first: 4) {
        edges {
          node {
            id
            title
            handle
            tags
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
            images(first: 1) {
              nodes {
                id
                url
                altText
              }
            }
          }
        }
      }
    }
  }`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
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
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    tags
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').PopularCollectionFragment} PopularCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
