"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Trang chủ",
    href: "/main",
    isActive: (pathname: string) => pathname === "/main",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
      >
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V21h13V9.5" />
      </svg>
    ),
  },
  {
    label: "Danh mục",
    href: "/main/category",
    isActive: (pathname: string) => pathname.startsWith("/main/category"),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
      >
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
      </svg>
    ),
  },
  {
    label: "Sản phẩm",
    href: "/main/product",
    isActive: (pathname: string) => pathname.startsWith("/main/product"),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
      >
        <path d="M4 7.5 12 3l8 4.5-8 4.5L4 7.5Z" />
        <path d="M4 7.5V16.5L12 21l8-4.5V7.5" />
      </svg>
    ),
  },
];

export default function RouteNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-3 overflow-x-auto pb-1" aria-label="Điều hướng chính">
      <ul className="flex min-w-max items-center gap-2 text-sm">
        {navItems.map((item) => {
          const active = item.isActive(pathname);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
                  active
                    ? "border-white bg-white text-[#ee4d2d]"
                    : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                <span
                  className={`absolute bottom-1 left-3 h-[2px] rounded-full bg-current transition-all duration-300 ${
                    active ? "w-[calc(100%-1.5rem)]" : "w-0 group-hover:w-[calc(100%-1.5rem)]"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
