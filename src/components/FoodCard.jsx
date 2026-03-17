import { useNavigate } from 'react-router-dom'

// Tailwind colour classes for each category badge.
const BADGE_COLOURS = {
  'Fruit':             'bg-orange-100 text-orange-700',
  'Vegetable':         'bg-green-100  text-green-700',
  'Meat & Fish':       'bg-red-100    text-red-700',
  'Dairy':             'bg-blue-100   text-blue-700',
  'Grains & Legumes':  'bg-yellow-100 text-yellow-700',
  'Other':             'bg-purple-100 text-purple-700',
}

// Filled heart — shown when the food is a favourite.
function HeartFilled() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-red-500" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

// Outline heart — shown when the food is not yet a favourite.
function HeartOutline() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-stone-400 stroke-2" aria-hidden="true">
      <path strokeLinejoin="round"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
           2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
           C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
           c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

/**
 * Displays a single food as a card in the home grid.
 *
 * Props:
 *   food           — the food object from foods.json
 *   isFavourite    — boolean, whether this food is currently favourited
 *   toggleFavourite(id) — toggles favourite state in localStorage
 *   isEaten        — boolean, whether this food has been eaten today
 */
export default function FoodCard({ food, isFavourite, toggleFavourite, isEaten }) {
  const navigate = useNavigate()

  return (
    <article
      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer
                 active:scale-[0.97] transition-transform duration-150"
      onClick={() => navigate(`/food/${food.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/food/${food.id}`)}
      aria-label={`View ${food.name}`}
    >
      {/* ── Image + heart overlay ── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-amber-50">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Eaten today indicator — bottom-left, non-interactive */}
        {isEaten && (
          <div
            className="absolute bottom-1.5 left-1.5 w-7 h-7 rounded-full
                       bg-green-400 flex items-center justify-center shadow-sm"
            aria-label="Eaten today"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-[3]" aria-hidden="true">
              <polyline points="4 12 9 17 20 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        {/* Heart button — 48×48 tap target, smaller visual circle */}
        <button
          className="absolute top-1.5 right-1.5 w-12 h-12 flex items-center justify-center"
          onClick={e => {
            e.stopPropagation()
            toggleFavourite(food.id)
          }}
          aria-label={isFavourite ? `Remove ${food.name} from favourites` : `Add ${food.name} to favourites`}
        >
          <span className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
            {isFavourite ? <HeartFilled /> : <HeartOutline />}
          </span>
        </button>
      </div>

      {/* ── Card body ── */}
      <div className="px-3 py-2.5">
        <p className="font-semibold text-stone-800 text-sm leading-tight mb-2">
          {food.name}
        </p>
        <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${BADGE_COLOURS[food.category] ?? 'bg-stone-100 text-stone-600'}`}>
          {food.category}
        </span>
      </div>
    </article>
  )
}
