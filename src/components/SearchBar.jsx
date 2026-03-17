// Magnifying-glass icon.
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-stone-400 stroke-2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="22" y2="22" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Full-width search input with a clear button.
 *
 * Props:
 *   value        — the current search string
 *   onChange(str) — called with the updated string on every keystroke or clear
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative px-4">
      {/* Search icon — decorative, left side */}
      <span className="absolute left-7 top-1/2 -translate-y-1/2 pointer-events-none">
        <SearchIcon />
      </span>

      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search foods…"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        className="w-full h-12 pl-9 pr-10 rounded-xl border border-stone-200
                   bg-white text-stone-800 placeholder:text-stone-400 text-sm
                   focus:outline-none focus:ring-2 focus:ring-green-300
                   focus:border-transparent"
      />

      {/* Clear button — only visible when input is non-empty */}
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-7 top-1/2 -translate-y-1/2
                     w-6 h-6 flex items-center justify-center
                     rounded-full text-stone-400 hover:text-stone-600
                     hover:bg-stone-100 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
            <line x1="6"  y1="6" x2="18" y2="18" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
