import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faEnvelope,
  faFilter,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {useRef, useEffect, useState, Suspense} from 'react';
import {defer} from '@remix-run/server-runtime';
import {Await, useLoaderData} from '@remix-run/react';
import Faq from '~/components/Faq';

export async function loader({context}) {
  const {storefront} = context;

  const {metaobjects} = await storefront.query(FAQ_QUERIE, {
    variables: {type: 'faq'},
  });

  return defer({metaobjects});
}

export default function Contacto() {
  const {metaobjects} = useLoaderData();
  console.log(metaobjects);

  const [copy, setCopy] = useState(false);
  const bannerRef = useRef();
  const productsRef = useRef();

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const contactInfoContent = useRef();

  // SCROLL ANIMATIONS //
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible-section');
        }
      });
    });
    observer.observe(bannerRef.current);
    // observer.observe(productsRef.current);
  });

  function revealInfo() {
    ref1.current.classList.add('mb-[100vh]');

    contactInfoContent.current.classList.remove('max-h-[0px]');
    contactInfoContent.current.classList.add('h-[100vh]');
  }

  function copyMail() {
    navigator.clipboard.writeText('houseoftapez@gmail.com');
  }
  return (
    <>
      <section>
        <div className="contact-banner hidden-section" ref={bannerRef}>
          CONTACTO
          <div className="contact-banner-bg"></div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="main-contact-section">
        <div className="absolute bg-2 -z-10"></div>
        <div className="flex flex-col p-10 justify-center">
          <h1 className="title-font-2 text-3xl">INFORMACION DE CONTACTO</h1>
          <div className="flex items-center h-10">
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-3xl text-[#e5d201] mr-4"
            />
            <a
              className="hover:text-[#e5d201]"
              href="https://www.instagram.com/houseoftapez?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            >
              @houseoftapez
            </a>
          </div>
          <div className="flex items-center h-10">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-3xl text-[#e5d201] mr-4"
            />
            <a
              onClick={() => copyMail()}
              className="hover:text-[#e5d201] cursor-pointer"
            >
              houseoftapez@gmail.com
            </a>
            {/* <div className="p-1 bg-opacity-40 ml-2">
              {copy ? 'copied' : 'copy'}
            </div> */}
          </div>
        </div>
        <div className="contact-info-text">
          <div className="contact-info-section">
            <h1 className="title-font-2 text-2xl mt-5">COMPRAS AL POR MAYOR</h1>
            <div className="text-font text-xl">
              Si eres representante de un club u organización, y te gustaría
              gestionar un pedido personalizado al por mayor, envíanos un
              correo! Nos pondremos en contacto y formarás parte de la familia
              HOUSE OF TAPEZ.
            </div>
          </div>
          <div className="contact-info-section">
            <h1 className="title-font-2 text-2xl mt-5">
              SÍGUENOS EN REDES SOCIALES
            </h1>
            <div className="text-font text-xl">
              Mantente al tanto de las últimas noticias, ofertas y novedades que
              tenemos preparadas para ti. Síguenos en Instagram para no perderte
              nada, y así comprar tape de la forma más conveniente y al mejor
              precio!
            </div>
          </div>
          <div className="contact-info-section">
            <h1 className="title-font-2 text-2xl mt-5">PREGUNTAS GENERALES</h1>
            <div className="text-font text-xl">
              Si tienes dudas sobre precios, stock, envíos u otras consultas
              generales, contáctanos vía dm o correo. Nos pondremos en contácto!
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      {/* STYLES IN shop.css filter section (reused) */}
      <div className="faq-wrapper">
        <h1 className="title-font-1 w-full text-center text-6xl p-9 bg-[#e5d201] text-black">
          FAQ
        </h1>

        <Suspense fallback={<div>Loading faq....</div>}>
          <Await resolve={metaobjects}>
            {(metaobjects) => {
              return metaobjects.nodes.map((faq) => (
                <Faq title={faq.fields[0].value} answer={faq.fields[1].value} />
              ));
            }}
          </Await>
        </Suspense>
      </div>
      <section className="h-[100vh]"></section>
    </>
  );
}

const FAQ_QUERIE = `#graphql
  query AllFAQ(
    $country: CountryCode
    $language: LanguageCode
    $type: String!
  ) @inContext(country: $country, language: $language) {
    metaobjects(first: 10, type: $type) {
      nodes {
        fields {
          type
          value
        }
      }
    }
  }
  `;
