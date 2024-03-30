import {NavLink} from '@remix-run/react';
import {useRef, useState} from 'react';

export default function DropMenu({reference, onLeave, onClick}) {
  const [showZinc, setShowZinc] = useState(false);
  const [showEAB, setShowEAB] = useState(false);
  const [showHouse, setShowHouse] = useState(false);
  const [showCandado, setShowCandado] = useState(false);
  const [showKine, setShowKine] = useState(false);

  function showOptions(e, setFunc) {
    if (e) {
      setFunc(true);
    } else {
      setFunc(false);
    }
  }

  return (
    <div
      ref={reference}
      className="absolute bg-black bg-opacity-90 backdrop-blur-sm h-0 w-full top-full left-0 z-10 overflow-hidden transition-all duration-500"
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className=" w-11/12 h-full m-auto flex flex-col">
        <div className="grid grid-cols-3 gap-16 mb-auto">
          <div className="pl-5 pt-5 flex flex-col">
            <h2 className="title-font-1 text-2xl">TAPES</h2>
            <div className="grid grid-cols-2 gap-1 mt-5">
              <NavLink
                prefetch="intent"
                to="/products/k-tape"
                className="nav-menu-item text-font"
              >
                K-TAPE
              </NavLink>
              {/* <NavLink
                prefetch="intent"
                to="/products/zinc-oxide"
                className="nav-menu-item text-font"
              >
                ZINC OXIDE
              </NavLink> */}
              <div className="overflow-hidden">
                {showZinc ? (
                  <div
                    onMouseLeave={() => showOptions(false, setShowZinc)}
                    className="flex"
                  >
                    <NavLink
                      prefetch="intent"
                      to="/products/zinc-oxide"
                      className="nav-menu-item-option text-font mr-auto"
                    >
                      WHITE
                    </NavLink>
                    <NavLink
                      prefetch="intent"
                      to="/products/zinc-oxide-tan"
                      className="nav-menu-item-option text-font mr-auto text-orange-400"
                    >
                      TAN
                    </NavLink>
                  </div>
                ) : (
                  <div
                    onMouseEnter={() => showOptions(true, setShowZinc)}
                    className="nav-menu-item text-font"
                  >
                    ZINC OXIDE
                  </div>
                )}
              </div>
              {/* <NavLink
                prefetch="intent"
                to="/products/eab-tear"
                className="nav-menu-item text-font"
              >
                EAB TAPES
              </NavLink> */}
              <div className="overflow-hidden">
                {showEAB ? (
                  <div
                    onMouseLeave={() => showOptions(false, setShowEAB)}
                    className="flex"
                  >
                    <NavLink
                      prefetch="intent"
                      to="/products/eab-tear"
                      className="nav-menu-item text-font mr-auto"
                    >
                      TEAR
                    </NavLink>
                    <NavLink
                      prefetch="intent"
                      to="/products/non-tear-eab"
                      className="nav-menu-item text-font mr-auto"
                    >
                      NON-TEAR
                    </NavLink>
                  </div>
                ) : (
                  <div
                    onMouseEnter={() => showOptions(true, setShowEAB)}
                    className="nav-menu-item text-font"
                  >
                    EAB TAPES
                  </div>
                )}
              </div>
              <NavLink
                prefetch="intent"
                to="/products/coban"
                className="nav-menu-item text-font"
              >
                COHESIVE BANDAGE
              </NavLink>
              <NavLink
                prefetch="intent"
                to="/products/fixation-tape"
                className="nav-menu-item text-font"
              >
                FIXATION TAPE
              </NavLink>
              <div className="nav-menu-item text-font"></div>
              <div className="nav-menu-item text-font"></div>
              <NavLink
                prefetch="intent"
                to="/shop/category/Tapes"
                className="nav-menu-button text-font"
              >
                VER TAPES →
              </NavLink>
            </div>
          </div>
          <div className="pl-5 pt-5">
            <h2 className="title-font-1 text-2xl">PACKS</h2>
            <div className="grid grid-cols-2 gap-1 mt-5">
              <div className="nav-menu-item text-font">SALTADOR</div>
              <div className="overflow-hidden">
                {showHouse ? (
                  <div
                    onMouseLeave={() => showOptions(false, setShowHouse)}
                    className="flex"
                  >
                    <NavLink
                      prefetch="intent"
                      to="/products/eab-tear"
                      className="nav-menu-item text-font mr-auto"
                    >
                      L
                    </NavLink>
                    <NavLink
                      prefetch="intent"
                      to="/products/non-tear-eab"
                      className="nav-menu-item text-font mr-auto font-black"
                    >
                      XL
                    </NavLink>
                  </div>
                ) : (
                  <div
                    onMouseEnter={() => showOptions(true, setShowHouse)}
                    className="nav-menu-item text-font"
                  >
                    HOUSE
                  </div>
                )}
              </div>
              <div className="overflow-hidden">
                {showKine ? (
                  <div
                    onMouseLeave={() => showOptions(false, setShowKine)}
                    className="flex"
                  >
                    <NavLink
                      prefetch="intent"
                      to="/products/eab-tear"
                      className="nav-menu-item text-font mr-auto"
                    >
                      L
                    </NavLink>
                    <NavLink
                      prefetch="intent"
                      to="/products/non-tear-eab"
                      className="nav-menu-item text-font mr-auto font-black"
                    >
                      XL
                    </NavLink>
                  </div>
                ) : (
                  <div
                    onMouseEnter={() => showOptions(true, setShowKine)}
                    className="nav-menu-item text-font"
                  >
                    KINE PREMIUM
                  </div>
                )}
              </div>
              {/* <div className="nav-menu-item text-font">KINE BÁSICO</div> */}
              <div className="overflow-hidden">
                {showCandado ? (
                  <div
                    onMouseLeave={() => showOptions(false, setShowCandado)}
                    className="flex"
                  >
                    <NavLink
                      prefetch="intent"
                      to="/products/eab-tear"
                      className="nav-menu-item text-font mr-auto"
                    >
                      L
                    </NavLink>
                    <NavLink
                      prefetch="intent"
                      to="/products/non-tear-eab"
                      className="nav-menu-item text-font mr-auto font-black"
                    >
                      XL
                    </NavLink>
                  </div>
                ) : (
                  <div
                    onMouseEnter={() => showOptions(true, setShowCandado)}
                    className="nav-menu-item text-font"
                  >
                    CANDADO
                  </div>
                )}
              </div>
              <div className="nav-menu-item text-font"></div>
              <div className="nav-menu-item text-font"></div>
              <div className="nav-menu-item text-font"></div>
              <div className="nav-menu-button text-font">VER PACKS →</div>
            </div>
          </div>
          <div className="pl-5 pt-5">
            <h2 className="title-font-1 text-2xl">CATEGORÍAS</h2>
            <div className="grid grid-cols-2 gap-1 mt-5">
              <NavLink
                prefetch="intent"
                to="shop/category/tape-elasticos"
                className="nav-menu-item text-font"
              >
                TAPES ELÁSTICOS
              </NavLink>
              <NavLink
                prefetch="intent"
                to="shop/category/tape-rigidos"
                className="nav-menu-item text-font"
              >
                NO ELÁSTICOS
              </NavLink>
              <NavLink
                prefetch="intent"
                to="shop/category/Accesorios"
                className="nav-menu-item text-font"
              >
                ACCESORIOS
              </NavLink>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mb-auto">
          <div className="pl-5 mr-auto flex flex-col gap-2">
            <div className="text-xl title-font-2">
              ASEGURATE CON NUESTROS PRODUCTOS. CALIDAD GARANTIZADA.
            </div>
          </div>
          <NavLink
            prefetch="intent"
            to="/shop"
            className="nav-menu-button text-font"
          >
            VER TODO →
          </NavLink>
          <img
            src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/X_Sticker_Yellow.png?v=1709827477"
            className="h-[100px]"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/tapeLogo-removebg.png?v=1710047551"
            className="h-[90px]"
          />
        </div>
      </div>
    </div>
  );
}
