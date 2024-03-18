import {useLoaderData, Link, useParams} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Pagination, getPaginationVariables, Image} from '@shopify/hydrogen';
import ProductPreview from '../components/ProductPreview';
import {useEffect, useRef} from 'react';

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context, params, request}) {
  const {storefront} = context;
  const {handle} = params;
  const variables = getPaginationVariables(request, {pageBy: 9});

  const data = await storefront.query(PRODUCTS_QUERY, {
    variables: {handle, ...variables},
  });
  console.log('data: ', data);
  return json({
    products: data.collection.products,
    category: data.collection.title,
    imageData: data.collection.image,
    description: data.collection.descriptionHtml,
  });
}

export default function Category(props) {
  const {products, category, imageData, description} = useLoaderData();
  console.log('url: ', imageData);

  const ref = useRef();

  useEffect(() => {
    if (category) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [category]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="relative w-[95%] mr-auto ml-auto mt-2">
        <Image data={imageData} aspectRatio="16/10" className="w-full" />
        <div className="flex flex-col absolute top-0 left-[50%] w-1/2 h-full bg-black bg-opacity-50 text-right pr-10">
          <div className="title-font-1 text-5xl mb-auto mt-[10%] p-3">{`${
            category ? category : 'TODOS LOS PRODUCTOS'
          }`}</div>
          <div
            dangerouslySetInnerHTML={{__html: description}}
            className="text-font text-xl mb-auto p-3 rounded-md"
          />
        </div>
      </div>

      <div className={`shop-title w-[95%] mr-auto ml-auto`}>
        <div>{`${category ? category : 'TODOS LOS PRODUCTOS'}`}</div>
      </div>

      <Pagination connection={products}>
        {({nodes, PreviousLink, NextLink}) => (
          <>
            <PreviousLink className="drop-down text-center">
              PREVIOUS
            </PreviousLink>
            <div className="shop-products-grid">
              {nodes.map((product) => {
                return (
                  <div key={product.id} className="product-in-grid">
                    <ProductPreview productData={product} />
                  </div>
                );
              })}
            </div>
            <NextLink className="pagination-button text-center">
              CARGAR MAS
            </NextLink>
          </>
        )}
      </Pagination>
    </div>
  );
}

const PRODUCTS_QUERY = `#graphql
query CategoryProducts(
  $country: CountryCode
  $language: LanguageCode
  $first: Int
  $last: Int
  $startCursor: String
  $endCursor: String
  $handle: String
) @inContext(country: $country, language: $language) {
  collection(handle: $handle) {
    title
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes { 
        id
        title
        handle
        images(first: 1) {
          nodes {
            url
            id
            altText
          }
        }
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
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
    image {
      url
    }
    descriptionHtml
  }
}
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
