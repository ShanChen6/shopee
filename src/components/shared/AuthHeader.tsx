import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="w-full border-b border-black/5 bg-white">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-4">
        <Link href="/main" className="flex items-center gap-3 text-[#ee4d2d]">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-[#ee4d2d] text-2xl font-bold text-white">
            S
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-semibold leading-none">Shopee</span>
            <span className="mb-0.5 text-2xl leading-none text-[#222]">Đăng nhập</span>
          </div>
        </Link>

        <Link href="#" className="text-sm text-[#ee4d2d] hover:underline">
          Bạn cần giúp đỡ?
        </Link>
      </div>
    </header>
  );
}
