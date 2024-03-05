import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faX} from '@fortawesome/free-solid-svg-icons';

export default function SportTapeSection(props) {
  return (
    <section className="hidden-section" ref={props.reference}>
      <div className="full-container">
        <div className="bg"></div>
        <div className="image-text">
          <div className="small-logo">
            <div className="H">H</div>
            <img
              src="https://cdn.shopify.com/s/files/1/0861/6149/0212/files/tapeLogo-removebg.png?v=1708710827"
              className="tape"
            />
            <div className="T">T</div>
          </div>
          <div className="x-container">
            <FontAwesomeIcon icon={faX} className="X" />
          </div>
          <div className="sport-tape-logo-container">
            <img
              src="https://cdn.shopify.com/s/files/1/0861/6149/0212/files/sportTapeLogo.png?v=1708722150"
              alt="STL"
              className="sport-tape-logo"
            />
          </div>
          <div className="medium-text text-font">
            <h3>DISTRIBUIDOR OFICIAL</h3>
          </div>
          <div className="browse-button">Browse Shop</div>
        </div>
        <div className="image-container">
          <img
            src="https://cdn.shopify.com/s/files/1/0861/6149/0212/files/kineSportTape.jpg?v=1708721802"
            alt="kine"
            className="kine"
          />
        </div>
      </div>
    </section>
  );
}
