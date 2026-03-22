import Link from "next/link";

type BrandProps = {
  compact?: boolean;
};

export default function Brand({ compact = false }: BrandProps) {
  return (
    <Link href="/main" className="flex items-center gap-2.5 md:gap-3">
      <div
        className={`grid place-items-center rounded-md bg-white font-bold text-[#ee4d2d] ${
          compact ? "h-9 w-9 text-2xl" : "h-11 w-11 text-3xl"
        }`}
      >
        S
      </div>
      <p
        className={`font-semibold tracking-tight text-white ${
          compact ? "text-2xl" : "text-[2rem]"
        }`}
      >
        Shopee
      </p>
    </Link>
  );
}
