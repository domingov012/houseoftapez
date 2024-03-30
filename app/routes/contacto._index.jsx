import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faMailBulk,
  faMailReply,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {useRef, useEffect, useState} from 'react';

export default function Contacto() {
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
      <section className="h-[100vh]">
        <div className="pl-10">
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
      </section>

      {/* FAQ SECTION */}
      <div className="faq-wrapper">
        <div className="faq-section">
          <div className="h-[100px] flex items-center">
            <div className="mr-auto">FAQ</div>
            <FontAwesomeIcon icon={faPlus} className="mr-4 text-xl" />
          </div>
          <div className="max-h-[0px]" ref={contactInfoContent}>
            AASSSS
          </div>
        </div>
        <div className="faq-section">
          <div className="h-[100px] flex items-center">
            <div className="mr-auto">FAQ</div>
            <FontAwesomeIcon icon={faPlus} className="mr-4 text-xl" />
          </div>
        </div>
        <div className="faq-section last">
          <div className="h-[100px] flex items-center">
            <div className="mr-auto">FAQ</div>
            <FontAwesomeIcon icon={faPlus} className="mr-4 text-xl" />
          </div>
        </div>
      </div>
      <section className="h-[100vh]"></section>
    </>
  );
}
