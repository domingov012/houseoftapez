import ProductPreview from './ProductPreview';

export default function Tutorial({
  title,
  i,
  embededUrl,
  productsRefArray,
  desc,
}) {
  const isEven = i % 2 === 0;
  const color = isEven ? '#e5d201' : '#000';
  const text = isEven ? '#000' : 'white';
  console.log('productsArray: ', productsRefArray);
  const long = productsRefArray.length >= 3;
  return (
    <div className={`video-container video-even-layout-${isEven}`}>
      {isEven && <YouTubeEmbed embedUrl={embededUrl} color={text} />}
      {/* <YouTubeEmbed embedUrl={embededUrl} /> */}

      <div className="flex flex-col items-center">
        <h1 className="title-font-1 pt-5 text-2xl text-center">{title}</h1>
        <div className="video-description text-font">{desc}</div>
      </div>
      <div className={`products-necesary-container border-[${text}]`}>
        <h1 className="title-font-1 pt-5 text-2xl">TAPES NECESARIOS: </h1>
        <div className={`scrollable long-scroll-${long}`}>
          {productsRefArray.map((product) => (
            <div className="w-3/4 mt-3">
              <ProductPreview productData={product.product} />
            </div>
          ))}
        </div>
      </div>
      {!isEven && <YouTubeEmbed embedUrl={embededUrl} color={text} />}
    </div>
  );
}

function YouTubeEmbed({embedUrl, color}) {
  return (
    <>
      <iframe
        className={`video-player border-4 border-[${color}]`}
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </>
  );
}
