import {NavLink} from '@remix-run/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faScissors, faCalendarCheck} from '@fortawesome/free-solid-svg-icons';

export default function MumbaiTapingBanner() {
  return (
    <div style={{height: '100%'}}>
      <div className="mumbai-banner-section">
        <div className="mumbai-banner-bg"></div>
        <div className="mumbai-banner-content">
          <div className="mumbai-partner-row">
            <span className="mumbai-partner-label">en alianza con</span>
            <img
              src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/logo_MUMBAI_color_blanco.png?v=1777862720"
              alt="Mumbai Kinesiología"
              className="mumbai-logo"
            />
          </div>
          <div className="mumbai-badge">NUEVO SERVICIO</div>
          <h2 className="mumbai-banner-title">
            SESIONES DE{' '}
            <span className="text-[#e5d201]">TAPING</span>
            {' '}CON KINESIÓLOGOS
          </h2>
          <p className="mumbai-banner-desc">
            Compra tu tape en House of Tapez y agenda una sesión con los
            kinesiólogos de <span className="text-[#e5d201] font-bold">Mumbai</span>.
            Atención profesional para deportistas y personas activas.
          </p>

          <div className="mumbai-features">
            <div className="mumbai-feature-item">
              <FontAwesomeIcon icon={faScissors} className="mumbai-feature-icon" />
              <span>Compra tu tape aquí</span>
            </div>
            <div className="mumbai-feature-divider" />
            <div className="mumbai-feature-item">
              <FontAwesomeIcon icon={faCalendarCheck} className="mumbai-feature-icon" />
              <span>Agenda tu sesión en Mumbai</span>
            </div>
          </div>

          <div className="mumbai-cta-group">
            <NavLink to="/shop" prefetch="intent" className="browse-button">
              Comprar tape
            </NavLink>
            <a
              href="https://mumbai.cl/"
              target="_blank"
              rel="noopener noreferrer"
              className="mumbai-external-cta"
            >
              Ir a Mumbai
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
