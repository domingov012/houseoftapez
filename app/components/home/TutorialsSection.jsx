import {useRef, useEffect} from 'react';

export default function TutorialsSection(props) {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible-section');
        } else {
          entry.target.classList.remove('visible-section');
        }
      });
    });
    observer.observe(ref1.current);
    observer.observe(ref2.current);
    observer.observe(ref3.current);
    observer.observe(ref4.current);
  }, []);

  return (
    <section ref={props.reference} className="half-container hidden-section">
      <div className="tape-banner-container">
        <div className="tutorial-image-container">
          <img
            ref={ref1}
            src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/taping-4-copy.png?v=1709143761"
            alt="taping"
            className="taping-img hidden-section"
          />
          <img
            ref={ref2}
            src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/taping-1-rezise2.jpg?v=1709143621"
            alt="taping"
            className="taping-img hidden-section"
          />
          <img
            ref={ref3}
            src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/taping-2-resize.jpg?v=1709143687"
            alt="taping"
            className="taping-img hidden-section"
          />
          <img
            ref={ref4}
            src="https://cdn.shopify.com/s/files/1/0643/3554/4485/files/taping-3-resize.jpg?v=1709143729"
            alt="taping"
            className="taping-img hidden-section"
          />
        </div>
        <div className="tutorials-text">
          <h2 className="bottom-right">TAPE LIKE A PRO</h2>
          <p className="bottom-right">
            Revisa nuestros tutoriales certificados por profesionales, para
            aprender a asegurar lo que necesites antes de un entrenamiento o
            partido!
          </p>
          <div className="tutorial-button middle">Browse Tutorials</div>
        </div>
      </div>
    </section>
  );
}
