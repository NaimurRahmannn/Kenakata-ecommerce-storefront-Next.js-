"use client";  

import { useState } from "react";
import Image from "next/image";
import { safeImage } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const validImages = Array.isArray(images)
    ? images.filter((image) => typeof image === "string" && image.trim().length > 0)
    : [];

  const mainImage = safeImage(validImages[0]);
  const thumbnailSources = validImages.length > 0 ? validImages.slice(0, 4) : [mainImage];

  const [selectedImage, setSelectedImage] = useState(mainImage); // ← track selected

  return (
    <section
      aria-label="Product image gallery"
      className="grid gap-4 lg:grid-cols-[96px_1fr]"
    >
      {/* Thumbnails */}
      <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible">
        {thumbnailSources.map((image, index) => {
          const src = safeImage(image);
          const isActive = selectedImage === src; // ← compare with selected

          return (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(src)} // ← update on click
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-white transition-colors hover:border-[#c3a06a] ${
                isActive ? "border-[#c3a06a]" : "border-[#e8dfd3]"  // ← active border
              }`}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-contain p-2"
                unoptimized
              />
            </button>
          );
        })}
      </div>

      {/* Main image */}
      <div className="order-1 overflow-hidden rounded-xl border border-[#e8dfd3] bg-[#faf7f1] p-6 shadow-sm">
        <div className="relative aspect-[4/5]">
          <Image
            src={selectedImage} // ← use selectedImage here
            alt={title}
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}