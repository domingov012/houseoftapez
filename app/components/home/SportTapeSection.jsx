import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faX} from '@fortawesome/free-solid-svg-icons';
import {NavLink} from '@remix-run/react';

export default function SportTapeSection(props) {
  return (
    <>
      <section className="hidden-section" ref={props.reference1}>
        <div className="full-container">
          <div className="bg"></div>
          <div className="image-text">
            <div className="small-logo">
              <div className="H">H</div>
              <img
                src="https://cdn.shopify.com/s/files/1/0861/6149/0212/files/tapeLogo-removebg.png?v=1708710827"
                className="tape"
              />
              <div className="T">T</div>
            </div>
            <div className="x-container">
              <FontAwesomeIcon icon={faX} className="X" />
            </div>
            <div className="sport-tape-logo-container">
              <img
                src="https://cdn.shopify.com/s/files/1/0861/6149/0212/files/sportTapeLogo.png?v=1708722150"
                alt="STL"
                className="sport-tape-logo"
              />
            </div>
            <div className="medium-text text-font">
              <h3>DISTRIBUIDOR OFICIAL</h3>
            </div>
            <NavLink to="/shop" prefetch="intent" className="browse-button">
              Ir a tienda
            </NavLink>
          </div>
          <div className="image-container mask">
            <img
              src="https://cdn.shopify.com/s/files/1/0861/6149/0212/files/kineSportTape.jpg?v=1708721802"
              alt="kine"
              className="kine"
            />
          </div>
        </div>
      </section>
      <div
        className="hidden-section border-t-8 border-black"
        ref={props.reference2}
      >
        <div className="flex-container-home">
          <img
            src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/spt-chr.jpg?v=1711806188"
            alt="chilerugbyxsporttape"
            className="half-image"
          />
          <div className="family-container">
            <h1 className="h-10vh family-title title-font-2">
              ÚNETE A LA FAMILIA{' '}
              <span className="text-[#e5d201]">HOUSE OF TAPEZ</span>
            </h1>
            <div className="clubs-text">
              <div className="text-font club-text-p">
                <div className="mb-10">
                  {/* Estos clubes deportivos de Chile confían en nuestros
                  productos. Únete a nuestra familia y asegúra a tu club con
                  SPORTTAPE **EDITAR** */}
                  Estamos trabajando con distintos clubes deportivos de Chile,
                  que confían en la calidad de nuestros productos! Únete a
                  nuestra familia y asegura a tu club con SPORTTAPE.
                </div>
                <NavLink
                  to="/contacto"
                  prefetch="intent"
                  className="contact-button w-1/2"
                >
                  ¡CONTÁCTANOS!
                </NavLink>
              </div>
              {/* <div className="clubs-grid">
                <img
                  className="club-logo"
                  src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/cda-removebg-preview.png?v=1711807275"
                />
                <img
                  className="club-logo"
                  src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/cobslogo.png?v=1711809716"
                />
                <img
                  className="club-logo"
                  src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/oblogo.png?v=1711810405"
                />
                <img
                  className="club-logo"
                  src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/Old-Johns-1.png?v=1711810694"
                />
                <img
                  className="club-logo"
                  src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/oldmackslogo.png?v=1711810873"
                />
                <img
                  className="club-logo"
                  src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/Old-Newladers-nuevo-1.png?v=1711811026"
                />
              </div> */}
            </div>
            <div className="absolute contact-swim-bg -z-10"></div>
          </div>
        </div>
      </div>
    </>
  );
}
