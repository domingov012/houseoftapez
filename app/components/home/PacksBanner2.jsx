import {NavLink} from '@remix-run/react';

export default function PickUpBanner2(props) {
  return (
    <>
      <section
        className="relative flex w-full justify-around px-5 pb-5"
        ref={props.reference}
      >
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden shadow-x"
          style={{
            backgroundImage:
              "url('https://cdn.shopify.com/s/files/1/0643/3554/4485/files/packsZincOxide.jpg?v=1743944316')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col gap-8 justify-center px-24">
            <h1 className="title-font text-white text-5xl font-bold max-w-2xl">
              Descubre nuestros Packs de Productos
            </h1>
            <p className="text-font text-white text-lg mt-4 max-w-xl">
              Preparate para tu competencia con el mejor tape y precio. Explora
              nuestros packs de productos diseñados con las combinaciones de
              productos más comunes y encuentra lo que necesitas!
            </p>
            <div className="max-w-2xl">
              <NavLink
                to="/shop/category/packs"
                prefetch="intent"
                className="browse-button-2 mx-auto"
              >
                Ir a Packs
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="relative" ref={props.reference}>
        <div className="h-full -z-10 absolute bg-[url('https://cdn.shopify.com/s/files/1/0643/3554/4485/files/packsZincOxide.jpg?v=1743942489')]"></div>
        <div className="pickup-info">
          <h1 className="title-font family-title py-4">
            PREPARATE CON NUESTROS PACKS
          </h1>
          <div className="flex flex-col items-center justify-center flex-1 gap-11 mb-10">
            <div className="flex gap-10 mobile-col">
              <p className="text-font text-left my-auto pickup-info-text px-10">
                <span className="text-[#e5d201] text-font">
                  ¡No te lo pierdas!
                </span>
              </p>
            </div>

            <NavLink
              to="/products/curso-taping-deportivo"
              prefetch="intent"
              className="browse-button-2 mx-auto"
            >
              Ver el curso
            </NavLink>
          </div>
        </div>
      </section> */}
    </>
  );
}
