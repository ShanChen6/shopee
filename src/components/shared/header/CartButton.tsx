type CartButtonProps = {
  compact?: boolean;
};

export default function CartButton({ compact = false }: CartButtonProps) {
  return (
    <button
      type="button"
      className={`relative grid place-items-center rounded-full text-white transition-colors hover:bg-white/10 ${
        compact ? "h-9 w-9" : "h-10 w-10"
      }`}
      aria-label="Giỏ hàng"
    >
      <span className="absolute right-0 top-0 min-w-4 rounded-full bg-white px-1 text-center text-[10px] font-bold leading-4 text-[#ee4d2d]">
        2
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={compact ? "h-5 w-5" : "h-6 w-6"}
      >
        <circle cx="9" cy="20" r="1.3" />
        <circle cx="18" cy="20" r="1.3" />
        <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21 8H7.2" />
      </svg>
    </button>
  );
}
