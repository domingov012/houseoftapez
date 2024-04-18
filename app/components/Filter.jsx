import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faFilter} from '@fortawesome/free-solid-svg-icons';
import {NavLink} from '@remix-run/react';

export default function Filter(props) {
  return (
    <div className="prod-info-dpd-wrapper">
      <div className="drop-down-info w-11/12">
        <h3>
          FILTRAR <FontAwesomeIcon icon={faFilter} className="ml-2" />
        </h3>
        <FontAwesomeIcon icon={faAngleDown} className="text-black" />
        <div className="item big-item">
          <div className="nested-menus">
            <div className="drop-down-info">
              <h3>CATEGORÍAS</h3>
              <FontAwesomeIcon icon={faAngleDown} className="text-black" />
              <div className="item mid-item">
                <div className="grid grid-cols-1">
                  <div className="flex items-center justify-center w-full h-20 bg-[url('https://cdn.shopify.com/s/files/1/0643/3554/4485/files/ktape-small-2.jpg?v=1709231624')] bg-no-repeat bg-cover bg-center hover:text-lg transition-all">
                    <NavLink
                      prefetch="intent"
                      to="shop/category/Accesorios"
                      className="title-font-1 cursor-pointer text-[#e5d201] mx-auto"
                    >
                      ACCESORIOS
                    </NavLink>
                  </div>
                  <div className="flex items-center justify-center w-full h-20 bg-[url('https://cdn.shopify.com/s/files/1/0643/3554/4485/files/eab-small.jpg?v=1709244528')] bg-no-repeat bg-cover bg-center hover:text-lg transition-all">
                    <NavLink
                      prefetch="intent"
                      to="shop/category/packs"
                      className="title-font-1 cursor-pointer text-[#e5d201] mx-auto"
                    >
                      PACKS
                    </NavLink>
                  </div>
                  <div className="flex items-center justify-center w-full h-20 bg-[url('https://cdn.shopify.com/s/files/1/0643/3554/4485/files/thumbtape-small.jpg?v=1709232087')] bg-no-repeat bg-cover bg-center hover:text-lg transition-all">
                    <NavLink
                      prefetch="intent"
                      to="shop/category/tape-elasticos"
                      className="title-font-1 cursor-pointer text-[#e5d201] mx-auto"
                    >
                      ELASTICOS
                    </NavLink>
                  </div>
                  <div className="flex items-center justify-center w-full h-20 bg-[url('https://cdn.shopify.com/s/files/1/0643/3554/4485/files/zincoxide-small.jpg?v=1709238973')] bg-no-repeat bg-cover bg-center hover:text-lg transition-all">
                    <NavLink
                      prefetch="intent"
                      to="shop/category/tape-rigidos"
                      className="title-font-1 cursor-pointer text-[#e5d201] mx-auto"
                    >
                      NO ELASTICOS
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="drop-down-info">
              <h3>Categorias</h3>
              <FontAwesomeIcon icon={faAngleDown} className="text-black" />
              <div className="item mid-item">
                <div className="pagination-button">ACCESORIOS</div>
                <div className="pagination-button">PACKS</div>
                <div className="pagination-button">ELASTICOS</div>
                <div className="pagination-button">NO ELASTICOS</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
