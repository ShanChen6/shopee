import Link from "next/link";

type QuickLinksProps = {
  items: string[];
};

export default function QuickLinks({ items }: QuickLinksProps) {
  if (!items.length) {
    return null;
  }

  return (
    <ul className="mt-1.5 hidden flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/90 md:flex">
      {items.map((item) => (
        <li key={item}>
          <Link href="#" className="transition-opacity hover:opacity-80">
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
}
