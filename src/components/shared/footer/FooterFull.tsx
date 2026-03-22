import DownloadApp from "./DownloadApp";
import FooterLinkSection from "./FooterLinkSection";
import LegalBlock from "./LegalBlock";
import LogoGrid from "./LogoGrid";
import {
  customerServiceSection,
  paymentLogos,
  regions,
  shippingLogos,
  shopeeVNSection,
  socialSection,
} from "./constants";

function SocialIcon({ label }: { label: string }) {
  if (label === "Facebook") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5 fill-current"
      >
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V5c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6V11H7v3h2.6v8h3.9Z" />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5 fill-current"
      >
        <path d="M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3Zm8.3 1.8H7.9a3.1 3.1 0 0 0-3.1 3.1v8.2a3.1 3.1 0 0 0 3.1 3.1h8.2a3.1 3.1 0 0 0 3.1-3.1V7.9a3.1 3.1 0 0 0-3.1-3.1Zm-4.1 3a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4Zm0 1.8a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Zm4.5-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5 fill-current"
      >
        <path d="M5.2 8.1a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8ZM3.5 20.4h3.4V9.5H3.5v10.9ZM9 9.5h3.2V11h.1c.4-.8 1.5-1.8 3.2-1.8 3.4 0 4 2.1 4 4.8v6.4H16v-5.7c0-1.4 0-3.1-2-3.1s-2.3 1.5-2.3 3v5.8H9V9.5Z" />
      </svg>
    );
  }

  return null;
}

export default function FooterFull() {
  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        <FooterLinkSection
          title={customerServiceSection.title}
          links={customerServiceSection.links}
        />

        <FooterLinkSection title={shopeeVNSection.title} links={shopeeVNSection.links} />

        <div className="space-y-6">
          <LogoGrid title="Thanh toán" items={paymentLogos} />
          <LogoGrid title="Đơn vị vận chuyển" items={shippingLogos} />
        </div>

        <FooterLinkSection
          title={socialSection.title}
          links={socialSection.links}
          iconByLabel={(label) => <SocialIcon label={label} />}
        />

        <DownloadApp />
      </div>

      <div className="mt-10 border-t border-black/10 pt-6 text-center text-xs text-[#777] sm:flex sm:items-center sm:justify-between sm:text-left">
        <p>© 2026 Shopee. Tất cả các quyền được bảo lưu.</p>
        <p className="mt-2 sm:mt-0">Quốc gia & Khu vực: {regions.join(" | ")}</p>
      </div>

      <LegalBlock />
    </>
  );
}
