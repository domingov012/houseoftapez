import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

export default function QuizResults({
  topResult,
  matchingPacks,
  otherResults,
  onRestart,
}) {
  const hasResults = topResult !== null;

  return (
    <div className="quiz-results">
      <h2 className="quiz-results-title">
        {hasResults ? (
          <>
            TE RECOMENDAMOS <span className="highlight">ESTE PRODUCTO</span>
          </>
        ) : (
          'NO ENCONTRAMOS COINCIDENCIAS'
        )}
      </h2>

      {hasResults ? (
        <>
          {/* Top Result Section */}
          <div className="quiz-top-section">
            {/* Main Recommendation */}
            <div className="quiz-top-result">
              <Link
                to={`/products/${topResult.handle}`}
                className="quiz-result-card quiz-result-card-large"
              >
                <span className="quiz-result-badge">Mejor opción</span>
                {topResult.featuredImage && (
                  <Image
                    data={topResult.featuredImage}
                    aspectRatio="1/1"
                    sizes="(min-width: 768px) 400px, 100vw"
                    className="quiz-result-image"
                  />
                )}
                <div className="quiz-result-info">
                  <h3 className="quiz-result-title">{topResult.title}</h3>
                  <Money
                    data={topResult.priceRange.minVariantPrice}
                    className="quiz-result-price"
                  />
                </div>
              </Link>
            </div>

            {/* Matching Packs */}
            {matchingPacks.length > 0 && (
              <div className="quiz-packs-section">
                <h3 className="quiz-packs-title">COMBÍNALO CON ESTOS PACKS</h3>
                <div className="quiz-packs-grid">
                  {matchingPacks.slice(0, 4).map((pack) => (
                    <Link
                      key={pack.id}
                      to={`/products/${pack.handle}`}
                      className="quiz-pack-card"
                    >
                      {pack.featuredImage && (
                        <Image
                          data={pack.featuredImage}
                          aspectRatio="1/1"
                          sizes="(min-width: 768px) 200px, 50vw"
                          className="quiz-pack-image"
                        />
                      )}
                      <div className="quiz-pack-info">
                        <h4 className="quiz-pack-title">{pack.title}</h4>
                        <Money
                          data={pack.priceRange.minVariantPrice}
                          className="quiz-pack-price"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other Results Section */}
          {otherResults.length > 0 && (
            <div className="quiz-other-section">
              <h3 className="quiz-other-title">OTRAS OPCIONES</h3>
              <div className="quiz-other-grid">
                {otherResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.handle}`}
                    className="quiz-result-card"
                  >
                    {product.featuredImage && (
                      <Image
                        data={product.featuredImage}
                        aspectRatio="1/1"
                        sizes="(min-width: 768px) 250px, 100vw"
                        className="quiz-result-image"
                      />
                    )}
                    <div className="quiz-result-info">
                      <h3 className="quiz-result-title">{product.title}</h3>
                      <Money
                        data={product.priceRange.minVariantPrice}
                        className="quiz-result-price"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="quiz-no-results">
          No encontramos productos que coincidan exactamente con tus
          necesidades. Explora nuestra tienda para ver todas las opciones.
        </p>
      )}

      <div className="quiz-results-actions">
        <button onClick={onRestart} className="quiz-restart-button">
          Volver a empezar
        </button>
        <Link to="/shop" className="quiz-shop-link">
          Ver todos los productos
        </Link>
      </div>
    </div>
  );
}
