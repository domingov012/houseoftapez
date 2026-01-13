import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

export default function QuizResults({results, onRestart}) {
  const hasResults = results && results.length > 0;

  return (
    <div className="quiz-results">
      <h2 className="quiz-results-title">
        {hasResults ? (
          <>
            TE RECOMENDAMOS <span className="highlight">ESTOS PRODUCTOS</span>
          </>
        ) : (
          'NO ENCONTRAMOS COINCIDENCIAS'
        )}
      </h2>

      {hasResults ? (
        <div className="quiz-results-grid">
          {results.map((product, index) => (
            <Link
              key={product.id}
              to={`/products/${product.handle}`}
              className="quiz-result-card"
            >
              {index === 0 && (
                <span className="quiz-result-badge">Mejor opción</span>
              )}
              {product.featuredImage && (
                <Image
                  data={product.featuredImage}
                  aspectRatio="1/1"
                  sizes="(min-width: 768px) 300px, 100vw"
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
