export type FooterVariant = "full" | "compact";

export type FooterLinkSection = {
  title: string;
  links: string[];
};

export type FooterImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type FooterLogoItem = FooterImageAsset;

export type FooterLegalBadge = {
  label: string;
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};
