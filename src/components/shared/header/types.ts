export type HeaderVariant = "main" | "category" | "product";

export type HeaderVariantConfig = {
  showTopBar: boolean;
  showQuickLinks: boolean;
  quickLinks: string[];
  searchPlaceholder: string;
};
