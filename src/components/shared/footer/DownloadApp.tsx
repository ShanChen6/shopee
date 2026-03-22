import Image from "next/image";
import { appStoreBadges, shopeeQr } from "./constants";

export default function DownloadApp() {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase text-[#555]">Tải ứng dụng Shopee</h3>
      <div className="mt-3 flex items-start gap-3">
        <div className="flex h-[92px] w-[92px] items-center justify-center rounded border border-black/10 bg-white p-1.5">
          <Image
            src={shopeeQr.src}
            alt={shopeeQr.alt}
            width={shopeeQr.width}
            height={shopeeQr.height}
            className="h-20 w-20 object-contain"
          />
        </div>
        <div className="space-y-2">
          {appStoreBadges.map((item) => (
            <div
              key={item.src}
              className="flex h-8 w-[92px] items-center justify-center rounded border border-black/10 bg-white px-2"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="h-auto max-h-4 w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
