"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

const FALLBACK_IMAGE = "/product-placeholder.svg";

export const ProductImage = ({
  src,
  alt,
  priority = false,
}: ProductImageProps) => {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-primary/10">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 28vw, (min-width: 768px) 42vw, (min-width: 640px) 33vw, (min-width: 480px) 50vw, 100vw"
        className="object-cover transition-transform duration-400 hover:scale-110"
        onError={() => {
          if (imageSrc !== FALLBACK_IMAGE) setImageSrc(FALLBACK_IMAGE);
        }}
      />
    </div>
  );
};
