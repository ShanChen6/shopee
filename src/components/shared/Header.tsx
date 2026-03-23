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
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-[#f53d2d] to-[#ff6633] text-white shadow-shoppe">
      <div className="mx-auto max-w-[1200px] px-3 sm:px-4">
        {config.showTopBar && <TopBar />}

        <div className="pb-3 pt-2 md:pb-4 md:pt-1">
          <div className="flex items-center justify-between gap-2 md:gap-6">
            <Brand compact={variant === "product"} />

            <div className="hidden flex-1 md:block">
              <SearchBar placeholder={config.searchPlaceholder} />
              {config.showQuickLinks && <QuickLinks items={config.quickLinks} />}
            </div>

            <CartButton compact={variant === "product"} />
          </div>

          <div className="mt-2 md:hidden">
            <SearchBar placeholder={config.searchPlaceholder} compact />
          </div>

          {variant !== "product" && <RouteNav />}
        </div>
      </div>

      {variant === "main" && (
        <div className="hidden border-t border-white/20 bg-white/8 md:block">
          <div className="mx-auto flex h-8 max-w-[1200px] items-center justify-between px-4 text-xs text-white/95">
            <p>Freeship đơn từ 0Đ</p>
            <p>Hoàn xu đến 10%</p>
            <p>Hàng chính hãng 100%</p>
          </div>
        </div>
      )}
    </header>
  );
}