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
            absolute inset-0
            bg-gradient-to-r from-black via-black/70 to-transparent
            md:bg-gradient-to-r md:from-black md:via-black/70 md:to-transparent
            max-md:bg-gradient-to-t max-md:from-black max-md:via-black/70 max-md:to-transparent
            flex flex-col gap-4 md:gap-6 justify-center
            px-6 sm:px-8 md:px-12 lg:px-24 xl:px-24
            py-8 md:py-0"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-[#e5d201] text-2xl md:text-3xl xl:text-4xl"
            />
            <h1 className="title-font text-white text-2xl md:text-3xl xl:text-5xl font-bold">
              TAPE FINDER
            </h1>
          </div>
          <p className="text-font text-white/90 text-sm md:text-lg max-w-xl">
            ¿No sabes qué tape necesitas? Responde algunas preguntas sobre tu
            lesión y te recomendaremos el producto ideal para ti.
          </p>
          <div className="mt-2 md:mt-0">
            <NavLink
              to="/tape-finder"
              prefetch="intent"
              className="browse-button-2"
            >
              Encontrar mi tape
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
