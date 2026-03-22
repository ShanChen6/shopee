import Image from "next/image";

import { companyInfo, legalBadges, policyLinks } from "./constants";

export default function LegalBlock() {
  return (
    <div className="mt-6 border-t border-black/10 pt-6">
      <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-[#888]">
        {policyLinks.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {legalBadges.length > 0 ? (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {legalBadges.map((badge) => (
            <a
              key={badge.href}
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={badge.label}
              className="inline-flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-95"
            >
              <Image
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                className="h-auto w-[120px] object-contain sm:w-[132px]"
              />
            </a>
          ))}
        </div>
      ) : null}

      <div className="mt-5 space-y-1 text-center text-[11px] leading-5 text-[#8a8a8a]">
        {companyInfo.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
