import {useState, useRef} from 'react';
import {NavLink, useNavigate} from '@remix-run/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faX} from '@fortawesome/free-solid-svg-icons';

export default function MobileMenu({reference, closeMenu}) {
  const [storeTouched, setStoreTouched] = useState(false);
  const [tapeTouched, settapeTouched] = useState(false);
  const [categoryTouched, setcategoryTouched] = useState(false);
  const storeRef = useRef();
  const storeChildRef = useRef();
  const tapeRef = useRef();
  const tapeChildRef = useRef();
  const categoryRef = useRef();
  const categoryChildRef = useRef();

  const navigate = useNavigate();

  function revealMenu(ref, state, setTouched, child) {
    if (state) {
      ref.current.classList.remove('h-fit');
      child.current.classList.add('hidden');
      ref.current.classList.add('h-12');
    } else {
      ref.current.classList.remove('h-12');
      child.current.classList.remove('hidden');
      ref.current.classList.add('h-fit');
    }
    setTouched((prev) => !prev);
  }
  return (
    <section
      ref={reference}
      className="mobile-menu-hidden fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-75 z-50"
    >
      <div className=" h-[20vh] w-full content-center">
        <div className="flex pl-5 pr-5 items-center">
          <div className="title-font-2 p-[5px] text-3xl">MENÚ</div>
          <FontAwesomeIcon
            icon={faX}
            className="text-3xl ml-auto p-[5px] cursor-pointer"
            onClick={closeMenu}
          />
        </div>
      </div>
      <div className="flex flex-col h-[80vh] gap-4 pl-5 pr-5 overflow-auto">
        <div ref={storeRef} className="h-12 overflow-hidden">
          <div
            className="drop-down"
            onTouchStart={() =>
              revealMenu(storeRef, storeTouched, setStoreTouched, storeChildRef)
            }
          >
            TIENDA
          </div>
          <div
            ref={storeChildRef}
            className="pl-7 mt-3 mb-3 border-l-2 border-[#e5d201]  bg-black bg-opacity-35 w-full"
          >
            <div className="h-12 overflow-hidden">
              <NavLink
                // onClick={closeAside}
                className="drop-down"
                prefetch="intent"
                to="/shop"
              >
                VER TODO
              </NavLink>
            </div>
            <div ref={tapeRef} className="h-12 overflow-hidden">
              <div
                className="drop-down"
                onTouchStart={() =>
                  revealMenu(tapeRef, tapeTouched, settapeTouched, tapeChildRef)
                }
              >
                TAPES
              </div>
              <div
                ref={tapeChildRef}
                className="pl-7 mt-3 mb-3 border-l-2 border-[#e5d201] max-h-36 overflow-auto bg-black bg-opacity-45"
              >
                <NavLink
                  //   onClick={closeAside}
                  prefetch="intent"
                  to="/shop"
                  className="nav-menu-item text-font text-[#e5d201]"
                >
                  VER TODOS
                </NavLink>
                <NavLink
                  //   onClick={closeAside}
                  prefetch="intent"
                  to="/products/k-tape"
                  className="nav-menu-item text-font"
                >
                  K-TAPE
                </NavLink>
                <NavLink
                  //   onClick={closeAside}
                  prefetch="intent"
                  to="/products/zinc-oxide"
                  className="nav-menu-item-option text-font mr-auto"
                >
                  ZINC OXIDE WHITE
                </NavLink>
                <NavLink
                  //   onClick={closeAside}
                  prefetch="intent"
                  to="/products/zinc-oxide-tan"
                  className="nav-menu-item-option text-font mr-auto"
                >
                  ZINC OXIDE TAN
                </NavLink>
                <NavLink
                  //   onClick={closeAside}
                  prefetch="intent"
                  to="/products/eab-tear"
                  className="nav-menu-item text-font mr-auto"
                >
                  TEAR EAB
                </NavLink>
                <NavLink
                  //   onClick={closeAside}
                  prefetch="intent"
                  to="/products/non-tear-eab"
                  className="nav-menu-item text-font mr-auto"
                >
                  NON-TEAR EAB
                </NavLink>
                <NavLink
                  //   onClick={closeAside}
                  prefetch="intent"
                  to="/products/coban"
                  className="nav-menu-item text-font"
                >
                  COHESIVE BANDAGE
                </NavLink>
                <NavLink
                  //   onClick={closeAside}
                  prefetch="intent"
                  to="/products/fixation-tape"
                  className="nav-menu-item text-font"
                >
                  FIXATION TAPE
                </NavLink>
              </div>
            </div>
            <div ref={categoryRef} className="h-12 overflow-hidden">
              <div
                className="drop-down"
                onTouchStart={() =>
                  revealMenu(
                    categoryRef,
                    categoryTouched,
                    setcategoryTouched,
                    categoryChildRef,
                  )
                }
              >
                CATEGORÍAS
              </div>
              <div
                ref={categoryChildRef}
                className="pl-7 mt-3 mb-3 border-l-2 border-[#e5d201] max-h-36 overflow-auto"
              >
                <NavLink
                  //   onClick={closeAside}
                  prefetch="intent"
                  className="nav-menu-item text-font"
                  to="/shop/category/tape-elasticos"
                >
                  Elásticos
                </NavLink>
                <NavLink
                  //   onClick={closeAside}
                  prefetch="intent"
                  className="nav-menu-item text-font"
                  to="/shop/category/tape-rigidos"
                >
                  No elásticos
                </NavLink>
                <NavLink
                  //   onClick={closeAside}
                  prefetch="intent"
                  className="nav-menu-item text-font"
                  to="/shop/category/Accesorios"
                >
                  Accesorios
                </NavLink>
                <NavLink
                  //   onClick={closeAside}
                  prefetch="intent"
                  className="nav-menu-item text-font text-[#e5d201]"
                  to="/shop/category/packs"
                >
                  Packs
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        {/* <NavLink
            prefetch="intent"
            to="/shop"
            className="drop-down"
            onMouseEnter={() => handleMenuDisplay()}
          >
            TIENDA
          </NavLink> */}
        <NavLink
          onClick={closeMenu}
          prefetch="intent"
          className="drop-down"
          to="/tutorials"
        >
          TUTORIALES
        </NavLink>
        <NavLink
          onClick={closeMenu}
          prefetch="intent"
          className="drop-down"
          to="/contacto"
        >
          CONTACTO
        </NavLink>
      </div>
    </section>
  );
}
