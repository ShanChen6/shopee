import Link from "next/link";
import type { ReactNode } from "react";

type FooterLinkSectionProps = {
  title: string;
  links: string[];
  iconByLabel?: (label: string) => ReactNode;
};

export default function FooterLinkSection({
  title,
  links,
  iconByLabel,
}: FooterLinkSectionProps) {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase text-[#555]">{title}</h3>
      <ul className="mt-3 space-y-2 text-xs text-[#666]">
        {links.map((item) => (
          <li key={item}>
            <Link
              href="#"
              className="inline-flex items-center gap-2 transition-colors hover:text-[#ee4d2d]"
            >
              {iconByLabel ? iconByLabel(item) : null}
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
