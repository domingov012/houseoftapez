import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Pagination, getPaginationVariables, Image} from '@shopify/hydrogen';
import ProductPreview from '../components/ProductPreview';

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context, request}) {
  const {storefront} = context;
  const variables = getPaginationVariables(request, {pageBy: 9});

  const data = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables,
  });
  return json({products: data.products});
}

export default function Shop(props) {
  const {products} = useLoaderData();
  console.log(products);
  return (
    <>
      <div className="shop-title w-[95%] mr-auto ml-auto">
        <div>{`${
          props.filterKey ? props.filterKey : 'TODOS LOS PRODUCTOS'
        }`}</div>
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
    </>
  );
}

const ALL_PRODUCTS_QUERY = `#graphql
query AllProducts(
  $country: CountryCode
  $language: LanguageCode
  $first: Int
  $last: Int
  $startCursor: String
  $endCursor: String
) @inContext(country: $country, language: $language) {
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
      tags
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
  }
}
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
