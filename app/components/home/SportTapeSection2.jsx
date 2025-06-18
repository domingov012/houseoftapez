import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faX} from '@fortawesome/free-solid-svg-icons';
import {NavLink} from '@remix-run/react';

export default function SportTapeSection2(props) {
  return (
    <div
      className="hidden-section border-t-8 border-black"
      ref={props.reference2}
    >
      <div className="flex-container-home">
        {/* <img
          src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/spt-chr.jpg?v=1711806188"
          alt="chilerugbyxsporttape"
          className="half-image"
        /> */}
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
                Estamos trabajando con distintos clubes deportivos de Chile, que
                confían en la calidad de nuestros productos! Únete a nuestra
                familia y asegúra a tu club con SPORTTAPE.
              </div>
              <NavLink
                to="/contacto"
                prefetch="intent"
                className="contact-button w-1/2"
              >
                ¡CONTÁCTANOS!
              </NavLink>
            </div>
          </div>
          <div className="absolute contact-swim-bg -z-10"></div>
        </div>
      </div>
    </div>
  );
}
