import {Image, Money} from '@shopify/hydrogen';

export default function ProductPreview(props) {
  return (
    <div className="preview-container">
      <div className="images-container">
        <Image
          data={props.productData.images.nodes[0]}
          aspectRatio="1/1"
          sizes="(min-width: 45em) 20vw, 50vw"
          className="prod-image"
        />
        {/* <img src={prodImage} className="prod-image" /> */}
      </div>
      <div className="info">
        <div className="prod-name">{props.productData.title}</div>
        <div className="prod-price">
          <Money data={props.productData.priceRange.minVariantPrice} />
        </div>
      </div>
    </div>
  );
}
