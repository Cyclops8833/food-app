/**
 * A toggle button that records whether a food has been eaten today.
 *
 * Props:
 *   id           — the food's ID string
 *   hasEaten(id) — returns true if this food is in today's log
 *   toggleEaten(id) — marks the food as eaten / un-eaten
 */
export default function DailyCheckmark({ id, hasEaten, toggleEaten }) {
  const eaten = hasEaten(id)

  return (
    <button
      onClick={() => toggleEaten(id)}
      aria-pressed={eaten}
      aria-label={eaten ? 'Mark as not eaten today' : 'Mark as eaten today'}
      className={`
        w-full min-h-[52px] flex items-center justify-center gap-3
        rounded-2xl border-2 font-medium text-sm
        transition-all duration-200 active:scale-[0.98]
        ${eaten
          ? 'bg-green-400 border-green-400 text-white'
          : 'bg-white border-stone-200 text-stone-500'
        }
      `}
    >
      {/* Circle with optional checkmark */}
      <span
        className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition-all duration-200 flex-shrink-0
          ${eaten ? 'bg-white border-white' : 'border-stone-300'}
        `}
      >
        {eaten && (
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 fill-none stroke-green-400 stroke-[3]"
            aria-hidden="true"
          >
            <polyline
              points="4 12 9 17 20 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      <span>{eaten ? 'Eaten today' : 'I ate this today'}</span>
    </button>
  )
}
