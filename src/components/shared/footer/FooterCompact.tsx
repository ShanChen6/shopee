import FooterLinkSection from "./FooterLinkSection";
import { customerServiceSection, regions, shopeeVNSection, socialSection } from "./constants";

export default function FooterCompact() {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-3">
        <FooterLinkSection
          title={customerServiceSection.title}
          links={customerServiceSection.links.slice(0, 4)}
        />
        <FooterLinkSection title={shopeeVNSection.title} links={shopeeVNSection.links.slice(0, 4)} />
        <FooterLinkSection title={socialSection.title} links={socialSection.links} />
      </div>

      <div className="mt-8 border-t border-black/10 pt-5 text-center text-[11px] text-[#888]">
        <p>&copy; 2026 Shopee. Tất cả các quyền được bảo lưu.</p>
        <p className="mt-1">Quốc gia & Khu vực: {regions.join(" | ")}</p>
      </div>
    </>
  );
}
