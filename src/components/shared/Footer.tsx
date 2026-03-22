import FooterCompact from "./footer/FooterCompact";
import FooterFull from "./footer/FooterFull";
import { FooterVariant } from "./footer/types";

type FooterProps = {
  variant?: FooterVariant;
};

export default function Footer({ variant = "full" }: FooterProps) {
  return (
    <footer className="mt-10 border-t border-[#ee4d2d] bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        {variant === "compact" ? <FooterCompact /> : <FooterFull />}
      </div>
    </footer>
  );
}
