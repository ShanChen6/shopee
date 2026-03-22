import Brand from "./header/Brand";
import CartButton from "./header/CartButton";
import { headerVariantConfig } from "./header/constants";
import QuickLinks from "./header/QuickLinks";
import RouteNav from "./header/RouteNav";
import SearchBar from "./header/SearchBar";
import TopBar from "./header/TopBar";
import { HeaderVariant } from "./header/types";

type HeaderProps = {
  variant?: HeaderVariant;
};

export default function Header({ variant = "main" }: HeaderProps) {
  const config = headerVariantConfig[variant];

  return (
    <header className="w-full bg-gradient-to-b from-[#f53d2d] to-[#ff6633] text-white shadow-shoppe">
      <div className="mx-auto max-w-[1200px] px-3 sm:px-4">
        {config.showTopBar && <TopBar />}

        <div className="py-3 md:py-4">
          <div className="flex items-center justify-between gap-3 md:gap-6">
            <Brand compact={variant === "product"} />

            <div className="hidden flex-1 md:block">
              <SearchBar placeholder={config.searchPlaceholder} />
              {config.showQuickLinks && <QuickLinks items={config.quickLinks} />}
            </div>

            <CartButton compact={variant === "product"} />
          </div>

          <div className="mt-3 md:hidden">
            <SearchBar placeholder={config.searchPlaceholder} compact />
          </div>

          {variant !== "product" && <RouteNav />}
        </div>
      </div>
    </header>
  );
}