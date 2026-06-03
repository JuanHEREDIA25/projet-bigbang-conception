import Link from "next/link"

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="Big Bang Conception"
    >
      <svg
        width="42"
        height="42"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Cercle */}
        <path
          d="M25 25C15 35 15 65 25 75"
          stroke="#d4af37"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M75 25C85 35 85 65 75 75"
          stroke="#d4af37"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Bâtiment 1 */}
        <path
          d="M40 18L52 24V80L40 76V18Z"
          fill="#d4af37"
        />

        {/* Bâtiment 2 */}
        <path
          d="M55 32L66 38V80L55 77V32Z"
          fill="#d4af37"
        />

        {/* Bâtiment 3 */}
        <path
          d="M69 52L78 57V80L69 78V52Z"
          fill="#d4af37"
        />
      </svg>

      <div className="hidden sm:flex flex-col leading-none">
        <span className="text-sm font-bold tracking-[0.25em] text-gray-900">
          BIG BANG
        </span>

        <span className="text-xs tracking-[0.3em] text-[#d4af37]">
          CONCEPTION
        </span>
      </div>
    </Link>
  )
}