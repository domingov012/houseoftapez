import {useEffect, useState, useRef, useCallback} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

const AUTO_ROTATE_INTERVAL = 5000; // 5 seconds

export default function Carousel({view1, view2, view3}) {
  const views = view3 ? [view1, view2, view3] : [view1, view2];
  const totalSlides = views.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Auto-rotate effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      goToNext();
    }, AUTO_ROTATE_INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [goToNext]);

  // Reset timer when manually navigating
  const handleManualNav = useCallback(
    (action) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      action();
      // Restart the timer after manual navigation
      timerRef.current = setInterval(() => {
        goToNext();
      }, AUTO_ROTATE_INTERVAL);
    },
    [goToNext],
  );

  return (
    <div className="carousel-container">
      {/* Navigation Arrows */}
      <button
        className="carousel-arrow carousel-arrow-left"
        onClick={() => handleManualNav(goToPrev)}
        aria-label="Previous slide"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button
        className="carousel-arrow carousel-arrow-right"
        onClick={() => handleManualNav(goToNext)}
        aria-label="Next slide"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>

      {/* Slides Container */}
      <div className="carousel-track">
        {views.map((view, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            aria-hidden={index !== currentIndex}
          >
            {view}
          </div>
        ))}
      </div>

      {/* Indicator Dots */}
      <div className="carousel-indicators">
        {views.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleManualNav(() => goToSlide(index))}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
