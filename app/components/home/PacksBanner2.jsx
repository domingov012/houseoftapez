import {NavLink} from '@remix-run/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBoxesStacked, faPercent} from '@fortawesome/free-solid-svg-icons';

export default function PacksBanner2(props) {
  return (
    <section
      className="relative flex w-full justify-around px-4 pb-5"
      ref={props.reference}
    >
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl"
        style={{
          backgroundImage:
            "url('https://cdn.shopify.com/s/files/1/0643/3554/4485/files/packsZincOxide.jpg?v=1743944316')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="
            absolute inset-0
            bg-gradient-to-r from-black via-black/80 to-transparent
            md:bg-gradient-to-r md:from-black md:via-black/80 md:to-transparent
            max-md:bg-gradient-to-t max-md:from-black max-md:via-black/70 max-md:to-transparent
            flex flex-col gap-4 md:gap-6 justify-center
            px-6 sm:px-8 md:px-12 lg:px-24 xl:px-24
            py-8 md:py-0"
        >
          {/* Badge */}
          <div className="flex items-center gap-2 bg-[#e5d201] text-black px-3 py-1.5 md:px-4 md:py-2 rounded-full w-fit">
            <FontAwesomeIcon icon={faPercent} className="text-xs md:text-sm" />
            <span className="text-font text-xs md:text-sm font-semibold">AHORRA HASTA 20%</span>
          </div>

          {/* Title */}
          <div className="flex items-center gap-3 md:gap-4">
            <FontAwesomeIcon
              icon={faBoxesStacked}
              className="text-[#e5d201] text-2xl md:text-3xl xl:text-4xl"
            />
            <h1 className="title-font text-white text-2xl md:text-3xl xl:text-5xl font-bold">
              NUESTROS PACKS
            </h1>
          </div>

          {/* Description */}
          <p className="text-font text-white/90 text-sm md:text-lg max-w-xl">
            Combina los productos que necesitas y ahorra. Packs diseñados para
            deportistas con las combinaciones más utilizadas.
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-3 md:gap-4 text-white/80 text-font text-xs md:text-sm">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#e5d201] rounded-full"></span>
              Envío gratis
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#e5d201] rounded-full"></span>
              Mejor precio
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#e5d201] rounded-full"></span>
              Todo lo que necesitas
            </span>
          </div>

          {/* CTA */}
          <div className="mt-2 md:mt-0">
            <NavLink
              to="/shop/category/packs"
              prefetch="intent"
              className="browse-button-2"
            >
              Ver Packs
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
