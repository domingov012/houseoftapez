import {Image, Money} from '@shopify/hydrogen';
import {CardContainer, CardBody, CardItem} from './ui/card.tsx';
import {Link} from '@remix-run/react';
import Tag from '../components/Tag.jsx';

export default function ProductPreview({productData}) {
  const isPack = productData.tags?.includes('pack');
  // const link = isPack
  //   ? `/packs/${productData.handle}`
  //   : `/products/${productData.handle}`;
  const link = `/products/${productData.handle}`;

  return (
    <Link prefetch="intent" to={link}>
      <CardContainer>
        <div className="preview-container relative overflow-hidden">
          {isPack && <Tag text="PACK" color1="#e5d201" color2="#0000" />}
          <CardBody>
            <CardItem
              translateZ="100"
              rotateZ={2}
              className="w-full shadow-2xl"
            >
              <div className="images-container">
                <Image
                  data={productData.images.nodes[0]}
                  aspectRatio="1/1"
                  sizes="(min-width: 35em) 23vw, 50vw"
                  className="prod-image"
                />
                {/* <img src={prodImage} className="prod-image" /> */}
              </div>
            </CardItem>
            <CardItem translateZ={300} translateX={10} className="w-full">
              <div className="info">
                <div className="prod-name">{productData.title}</div>
                <div className="prod-price flex">
                  <Money
                    data={productData.priceRange.minVariantPrice}
                    className="text-font"
                  />

                  {parseInt(productData.priceRange.minVariantPrice.amount) <
                    parseInt(productData.priceRange.maxVariantPrice.amount) && (
                    <>
                      <span className="mr-1 ml-1"> - </span>
                      <Money
                        data={productData.priceRange.maxVariantPrice}
                        className="text-font"
                      />
                    </>
                  )}
                </div>
              </div>
            </CardItem>
          </CardBody>
        </div>
      </CardContainer>
    </Link>
  );
}
