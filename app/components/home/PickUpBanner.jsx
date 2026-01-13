import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faClock,
  faLocationDot,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import {NavLink} from '@remix-run/react';

export default function PickUpBanner(props) {
  return (
    <div ref={props.reference} className="hidden-section">
      <div className="pickup-banner-section">
        <div className="pickup-banner-bg"></div>
        <div className="pickup-banner-content">
          <h2 className="pickup-banner-title">
            RETIRO EN <span className="text-[#e5d201]">BODEGA</span>
          </h2>

          <div className="pickup-details">
            <div className="pickup-detail-item">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="pickup-detail-icon"
              />
              <div className="pickup-detail-text">
                <span className="pickup-detail-label">Dirección</span>
                <span className="pickup-detail-value">
                  Luis Vivanco Castro 7320, La Reina
                </span>
              </div>
            </div>

            <div className="pickup-detail-item">
              <FontAwesomeIcon icon={faClock} className="pickup-detail-icon" />
              <div className="pickup-detail-text">
                <span className="pickup-detail-label">Horario de retiro</span>
                <span className="pickup-detail-value">
                  Lunes a Viernes hasta las 15:00hrs
                </span>
              </div>
            </div>

            <div className="pickup-detail-item pickup-detail-highlight">
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="pickup-detail-icon"
              />
              <div className="pickup-detail-text">
                <span className="pickup-detail-value">
                  Pedidos realizados antes de las <strong>10:00hrs</strong>{' '}
                  están listos el mismo día
                </span>
              </div>
            </div>
          </div>

          <NavLink
            to="/shop"
            prefetch="intent"
            className="browse-button pickup-cta"
          >
            Ir a tienda
          </NavLink>
        </div>
      </div>
    </div>
  );
}
