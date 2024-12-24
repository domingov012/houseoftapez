import {NavLink} from '@remix-run/react';

export default function PickUpBanner(props) {
  return (
    <>
      <section className="relative" ref={props.reference}>
        <div className="h-full w-full -z-10 absolute bg-cover bg-center bg-[url('https://cdn.shopify.com/s/files/1/0643/3554/4485/files/kine-2.jpg?v=1735011621')]"></div>
        {/* <div className="h-full w-6/12 bg-black bg-opacity-40 px-10"> */}
        <div className="pickup-info">
          <h1 className="title-font family-title py-4">
            PRIMER CURSO DE TAPING DEPORTIVO HOUSE OF TAPEZ
          </h1>
          <div className="flex flex-col items-center justify-center flex-1 gap-11 mb-10">
            <div className="flex gap-10 mobile-col">
              <p className="text-font text-left my-auto pickup-info-text px-10">
                Eres estudiante de kinesiología, salud, o entrenador deportivo y
                te interesa el mundo del vendaje? Aprovecha esta oportunidad
                para aprender sobre el vendaje deportivo funcional, con
                kinesiólogos del equipo de Los Cóndores.{' '}
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
      </section>
    </>
  );
}
