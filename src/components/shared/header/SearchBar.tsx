type SearchBarProps = {
  placeholder: string;
  compact?: boolean;
};

export default function SearchBar({ placeholder, compact = false }: SearchBarProps) {
  return (
    <form className="flex h-10 items-center rounded-sm bg-white p-1 shadow-lg shadow-black/10">
      <input
        type="text"
        placeholder={placeholder}
        className={`h-full flex-1 text-sm text-gray-700 outline-none placeholder:text-gray-400 ${
          compact ? "px-2.5" : "px-3"
        }`}
      />
      <button
        type="submit"
        className={`grid h-8 place-items-center rounded-sm bg-[#fb5533] text-white transition-colors hover:bg-[#f13f1d] ${
          compact ? "w-10" : "w-14"
        }`}
        aria-label="Tìm kiếm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.4-3.4" />
        </svg>
      </button>
    </form>
  );
}
