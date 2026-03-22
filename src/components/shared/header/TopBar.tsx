import Link from "next/link";
import { topLeftLinks, topRightLinks } from "./constants";

export default function TopBar() {
  return (
    <div className="hidden h-9 items-center justify-between text-xs text-white/95 lg:flex">
      <div className="flex items-center gap-3">
        {topLeftLinks.map((item, index) => (
          <div key={item} className="flex items-center gap-3">
            <Link href="#" className="transition-opacity hover:opacity-80">
              {item}
            </Link>
            {index < topLeftLinks.length - 1 && (
              <span className="h-3 w-px bg-white/40" />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {topRightLinks.map((item) => (
          <Link
            key={item}
            href="#"
            className={`transition-opacity hover:opacity-80 ${
              item === "Đăng nhập" ? "font-semibold" : ""
            }`}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
