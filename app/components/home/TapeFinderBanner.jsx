import {NavLink} from '@remix-run/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

export default function TapeFinderBanner(props) {
  return (
    <section
      className="relative flex w-full justify-around px-4 pb-5"
      ref={props.reference}
    >
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl"
        style={{
          backgroundImage:
            "url('https://cdn.shopify.com/s/files/1/0643/3554/4485/files/pickupBanner.jpg?v=1724796571')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="
            absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent
            flex flex-col gap-6 justify-center
            px-8 sm:px-12 md:px-24 lg:px-24 xl:px-24"
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-[#e5d201] text-3xl xl:text-4xl"
            />
            <h1 className="title-font text-white text-3xl xl:text-5xl font-bold">
              TAPE FINDER
            </h1>
          </div>
          <p className="text-font text-white text-lg max-w-xl">
            ¿No sabes qué tape necesitas? Responde algunas preguntas sobre tu
            lesión y te recomendaremos el producto ideal para ti.
          </p>
          <div className="max-w-2xl">
            <NavLink
              to="/tape-finder"
              prefetch="intent"
              className="browse-button-2 mx-auto"
            >
              Encontrar mi tape
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
