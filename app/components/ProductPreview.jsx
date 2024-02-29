import {Image, Money} from '@shopify/hydrogen';
import {CardContainer, CardBody, CardItem} from './ui/card.tsx';
import {Link} from '@remix-run/react';

export default function ProductPreview(props) {
  return (
    <Link prefetch="intent" to={`/products/${props.productData.handle}`}>
      <CardContainer>
        <div className="preview-container">
          <CardBody>
            <CardItem
              translateZ="100"
              rotateZ={2}
              className="w-full shadow-2xl"
            >
              <div className="images-container">
                <Image
                  data={props.productData.images.nodes[0]}
                  aspectRatio="1/1"
                  sizes="(min-width: 35em) 23vw, 50vw"
                  className="prod-image"
                />
                {/* <img src={prodImage} className="prod-image" /> */}
              </div>
            </CardItem>
            <CardItem translateZ={300} translateX={10} className="w-full">
              <div className="info">
                <div className="prod-name">{props.productData.title}</div>
                <div className="prod-price">
                  <Money data={props.productData.priceRange.minVariantPrice} />
                </div>
              </div>
            </CardItem>
          </CardBody>
        </div>
      </CardContainer>
    </Link>
  );
}
