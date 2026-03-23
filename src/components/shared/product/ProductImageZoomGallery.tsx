"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type GalleryImage = {
  id: string;
  image: string;
  name: string;
};

type ProductImageZoomGalleryProps = {
  items: GalleryImage[];
};

export default function ProductImageZoomGallery({ items }: ProductImageZoomGalleryProps) {
  const safeItems = useMemo(() => (items.length > 0 ? items : []), [items]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  if (safeItems.length === 0) {
    return null;
  }

  const activeItem = safeItems[activeIndex] ?? safeItems[0];

  return (
    <>
      <button
        type="button"
        onClick={() => setZoomOpen(true)}
        className="group relative block aspect-square w-full overflow-hidden rounded-md border border-[#f0f0f0] bg-[#fafafa]"
        aria-label="Phóng to ảnh sản phẩm"
      >
        <Image
          src={activeItem.image}
          alt={activeItem.name}
          fill
          sizes="(max-width: 1024px) 100vw, 420px"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 rounded bg-black/55 px-2 py-1 text-xs text-white">Nhấn để phóng to</span>
      </button>

      <div className="mt-3 grid grid-cols-5 gap-2">
        {safeItems.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-square overflow-hidden rounded border transition ${
              index === activeIndex ? "border-[#ee4d2d]" : "border-[#ececec] hover:border-[#f4b6a7]"
            }`}
            aria-label={`Xem ảnh ${index + 1}`}
          >
            <Image
              src={item.image}
              alt={`${item.name} ${index + 1}`}
              fill
              sizes="84px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {zoomOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
          onClick={() => setZoomOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setZoomOpen(false);
            }
          }}
        >
          <div
            className="relative w-full max-w-[980px] overflow-hidden rounded-md bg-white p-3 sm:p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-xl leading-none text-white transition hover:bg-black/75"
              onClick={() => setZoomOpen(false)}
              aria-label="Dong popup"
            >
              ×
            </button>

            <div className="relative aspect-[4/3] max-h-[78vh] overflow-hidden rounded border border-[#f0f0f0] bg-[#fafafa]">
              <Image
                src={activeItem.image}
                alt={`Phong to ${activeItem.name}`}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8">
              {safeItems.map((item, index) => (
                <button
                  key={`${item.id}-zoom-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded border transition ${
                    index === activeIndex ? "border-[#ee4d2d]" : "border-[#ececec] hover:border-[#f4b6a7]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={`${item.name} zoom ${index + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
