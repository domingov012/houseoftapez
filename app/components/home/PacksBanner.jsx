import {NavLink} from '@remix-run/react';

export default function PacksBanner(props) {
  return (
    <section ref={props.reference} className="hidden-section">
      <div className="packs-banner">
        <div className="packs-info-container">
          <div className="packs-text">
            <h2>GEAR UP</h2>
            <p className="text-font">
              Compra todo lo que necesitas para tu partido al mejor precio con
              nuestros packs!
            </p>
            <NavLink
              prefetch="intent"
              to="/shop/category/packs"
              className="browse-button inside"
            >
              Comprar Packs
            </NavLink>
          </div>
          <div className="packs-image">
            <img
              src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/packs-resize.jpg?v=1709144321"
              alt="packs"
              className="taping-img"
            />
          </div>
          <NavLink
            to="/shop/category/packs"
            prefetch="intent"
            className="browse-button outside "
          >
            Comprar Packs
          </NavLink>
        </div>
      </div>
    </section>
  );
}
