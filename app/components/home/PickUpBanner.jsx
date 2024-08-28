import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faX} from '@fortawesome/free-solid-svg-icons';
import {NavLink} from '@remix-run/react';

export default function PickUpBanner(props) {
  return (
    <>
      <section className="relative" ref={props.reference}>
        <div className="h-full w-full -z-10 absolute bg-cover bg-center bg-[url('https://cdn.shopify.com/s/files/1/0643/3554/4485/files/pickupBanner.jpg?v=1724796571')]"></div>
        {/* <div className="h-full w-6/12 bg-black bg-opacity-40 px-10"> */}
        <div className="pickup-info">
          <h1 className="title-font family-title py-4">
            ¡AHORA TENEMOS{' '}
            <span className="text-[#e5d201]">PUNTO DE RETIRO</span>!
          </h1>
          <div className="flex flex-col items-center justify-center flex-1 gap-11 mb-10">
            <div className="flex gap-10">
              <img src="locationIcon.svg" className="pickup-icon"></img>
              <p className="text-font text-left my-auto pickup-info-text">
                Selecciona la opción<br></br>
                <span className="text-[#e5d201] text-font">
                  “PUNTO DE RETIRO WARECLOUDS”
                </span>{' '}
                <br></br>
                en la pantalla de pago y dejaremos tu pedido listo para retirar!
              </p>
            </div>
            <div className="flex gap-10">
              <p className="text-font text-left my-auto pickup-info-text">
                HORARIOS: Martes y Jueves de hora - hora
                <br></br>
                DIRECCION: direccion del punto
              </p>
              <img src="calendarIcon.svg" className="ml-auto pickup-icon"></img>
            </div>
            <NavLink
              to="/shop"
              prefetch="intent"
              className="browse-button-2 mx-auto"
            >
              Ir a tienda
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}
