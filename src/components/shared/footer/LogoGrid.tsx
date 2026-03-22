import Image from "next/image";
import { FooterLogoItem } from "./types";

type LogoGridProps = {
  title: string;
  items: FooterLogoItem[];
};

export default function LogoGrid({ title, items }: LogoGridProps) {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase text-[#555]">{title}</h3>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.src}
            className="flex h-11 items-center justify-center rounded border border-black/10 bg-white px-2 py-1"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="h-auto max-h-[22px] w-auto max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
