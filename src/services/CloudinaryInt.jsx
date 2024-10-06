// Cloudinary integration for optimized image rendering
import React from 'react';

export default function OptimizedImage({
  imageType = "image1",
  className: customClass = "",
  loading = "lazy",
  alt = "Imagen relacionada con diseño web",
  width = 1024,
  height = 450,
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, 33vw",

}) {
  // Base URL for Cloudinary with automatic quality optimization and caching
  const BASE_URL = "https://res.cloudinary.com/onamuapp/image/upload/q_auto,fl_immutable_cache";

  // Specific image paths, each with its own URL on Cloudinary
  const IMAGE_PATHS = {
    image1: "v1723315867/Hacemos-tu-pagina-web-en-cdmx_shddug.webp",
    image2: "v1726796126/I38roD05udrE0J9SDKYjcy1wdj0.jpg_qcfsfc.avif",
    image3: "v1726796125/ioKCUXXKO414RWIQn1o2fmkfTB4.jpg_n2qids.avif",
  };

  // Function to generate the srcset attribute
  const generateSrcSet = (path) => {
    return [300, 600, 900, 1200]
      .map((w) => `${BASE_URL}/f_auto,q_auto,w_${w},c_limit/${path} ${w}w`)
      .join(", ");
  };

  // Select the path of the image based on the type
  const path = IMAGE_PATHS[imageType] || `path/to/${imageType}.webp`;

  // Generate srcset for different image resolutions
  const srcset = generateSrcSet(path);
  // Fallback for browsers that do not support avif or srcset
  const fallbackSrc = `${BASE_URL}/f_auto/${path}`;

  // Construct CSS class, removing extra whitespace
  const className = `optimized-image ${customClass}`.trim();

  // Render optimized image
  return (
    <picture>
      <source srcSet={srcset} sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, 33vw" type="image/avif" />
      <img
        src={fallbackSrc}
        alt={alt}
        className={`${className} block max-w-full h-auto rounded-2xl aspect-[1.66]`}
        loading={loading}
        decoding="async"
        width={String(width)}
        height={String(height)}
      />
    </picture>
  );
}