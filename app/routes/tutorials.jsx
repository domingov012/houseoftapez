import {useLoaderData, defer, Await} from '@remix-run/react';
import TutorialsDisplay from '../components/TutorialsDisplay.jsx';
import {useRef, useEffect, Suspense} from 'react';

export async function loader({context}) {
  const {storefront} = context;

  const tutorial_metaobjects = await storefront.query(TUTORIALS_QUERY);
  const productIdSet = new Set();
  const productIdHandle = {};

  const products_array = Promise.all(
    tutorial_metaobjects.metaobjects.nodes.map((tutorial, i) => {
      let array = Promise.all(
        JSON.parse(tutorial.fields[1].value).map((id) => {
          if (id in productIdSet) {
            return productIdHandle[id];
          } else {
            productIdHandle[id] = storefront.query(TUTORIAL_PRODUCT_QUERY, {
              variables: {id},
            });
            productIdSet.add(id);
            return productIdHandle[id];
          }
        }),
      );
      return array;
    }),
  );
  console.log('ARRAY: ', products_array);
  return defer({
    tutorials: tutorial_metaobjects,
    products: products_array,
  });
}

export default function TutorialsPage() {
  const {tutorials, products} = useLoaderData();
  const tutorial_array = tutorials.metaobjects.nodes;
  const products_array = products;

  console.log('tutorials: ', tutorials);
  console.log('products: ', products);

  const ref1 = useRef();

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
  }, []);

  return (
    <>
      <section ref={ref1} className="hidden-section h-fit relative">
        <div className="banner-wrapper">
          <img src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/8G9A2255.jpg?v=1710433382" />
          <img src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/AF2I689194.jpg?v=1710433374" />
          <img src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/AF2I690798.jpg?v=1710433373" />
          <img src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/AF2I666026.jpg?v=1710433373" />
          <img src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/3T6A0210.jpg?v=1710433354" />
          <img src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/3T6A0402142.jpg?v=1710433341" />
          <img src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/3T6A0191106.jpg?v=1710433341" />
          <img src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/3T6A013775.jpg?v=1710433341" />
          <img
            className="last-image"
            src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/3T6A005430.jpg?v=1710433341"
          />
          <div className="absolute flex h-full bg-black bg-opacity-50">
            <div className="tutorials-title title-font-2">
              APLICA TAPE COMO UN PROFESIONAL
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<div>LOADING TUTORIALS...</div>}>
        <Await resolve={products_array}>
          {(products_array) => (
            <TutorialsDisplay
              productsArray={products_array}
              tutorialArray={tutorial_array}
            />
          )}
        </Await>
      </Suspense>
    </>
  );
}

const TUTORIALS_QUERY = `#graphql
    query Tutoriales(
        $country: CountryCode
        $language: LanguageCode
    ) @inContext(country: $country, language: $language) {
        metaobjects(type: "Tutorial", first: 10) {
            nodes {
                handle
                fields {
                    key
                    value
                }
            }
        }
    }`;

const TUTORIAL_PRODUCT_QUERY = `#graphql
    query ProductForTutorial(
        $country: CountryCode
        $language: LanguageCode
        $id: ID
    ) @inContext(country: $country, language: $language) {
        product(id: $id) {
          images(first: 1) {
            nodes {
              url
              altText
              height
            }
          }
          title
          handle
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
    }`;
