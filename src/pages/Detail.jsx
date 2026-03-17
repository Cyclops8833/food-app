import { useParams, useNavigate } from 'react-router-dom'
import foods from '../data/foods.json'
import { useFavourites } from '../hooks/useFavourites'
import { useDailyLog } from '../hooks/useDailyLog'
import NutrientBadge from '../components/NutrientBadge'
import DailyCheckmark from '../components/DailyCheckmark'

// Same colour system as FoodCard — kept in sync here.
const BADGE_COLOURS = {
  'Fruit':            'bg-orange-100 text-orange-700',
  'Vegetable':        'bg-green-100  text-green-700',
  'Meat & Fish':      'bg-red-100    text-red-700',
  'Dairy':            'bg-blue-100   text-blue-700',
  'Grains & Legumes': 'bg-yellow-100 text-yellow-700',
  'Other':            'bg-purple-100 text-purple-700',
}

// ── Small reusable pieces ────────────────────────────────────────────────────

function SectionHeading({ children }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
      {children}
    </h2>
  )
}

function HeartFilled() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-red-500" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

function HeartOutline() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-stone-400 stroke-2" aria-hidden="true">
      <path strokeLinejoin="round"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
           2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
           C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
           c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-stone-700 stroke-2" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function Detail() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const { isFavourite, toggleFavourite } = useFavourites()
  const { hasEaten, toggleEaten } = useDailyLog()

  const food = foods.find(f => f.id === id)

  // Guard — should never render with a bad ID in normal use.
  if (!food) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
        <p className="text-stone-500 text-center">Food not found.</p>
        <button
          onClick={() => navigate('/')}
          className="text-green-600 font-medium text-sm"
        >
          ← Back to home
        </button>
      </div>
    )
  }

  const favourited = isFavourite(food.id)

  return (
    <div className="min-h-screen bg-stone-50 pb-12">

      {/* ── Hero image with floating back button ── */}
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden bg-stone-200">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Back button — 48×48 tap target floating over image */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="absolute top-3 left-3 w-12 h-12 flex items-center justify-center
                     rounded-full bg-white/85 backdrop-blur-sm shadow-sm
                     active:scale-95 transition-transform"
        >
          <BackIcon />
        </button>
      </div>

      {/* ── Content ── */}
      <div className="px-4 pt-5 space-y-6">

        {/* Name + heart toggle */}
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold text-stone-800 leading-tight flex-1">
            {food.name}
          </h1>

          {/* Heart toggle — 48×48 tap target */}
          <button
            onClick={() => toggleFavourite(food.id)}
            aria-label={favourited ? `Remove ${food.name} from favourites` : `Add ${food.name} to favourites`}
            className="w-12 h-12 flex items-center justify-center flex-shrink-0
                       rounded-full active:scale-95 transition-transform"
          >
            {favourited ? <HeartFilled /> : <HeartOutline />}
          </button>
        </div>

        {/* Category badge + serving size */}
        <div className="-mt-4">
          <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full
                           ${BADGE_COLOURS[food.category] ?? 'bg-stone-100 text-stone-600'}`}>
            {food.category}
          </span>
          <p className="text-stone-400 text-sm mt-1.5">
            Per {food.servingSize}
          </p>
        </div>

        {/* Divider */}
        <hr className="border-stone-100" />

        {/* Nutrients */}
        <section>
          <SectionHeading>What's inside</SectionHeading>
          <div className="flex flex-wrap gap-2 mt-3">
            {food.nutrients.map(n => (
              <NutrientBadge key={n.name} name={n.name} strength={n.strength} />
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section>
          <SectionHeading>Good for you because</SectionHeading>
          <p className="text-stone-700 text-sm leading-relaxed mt-2">
            {food.benefits}
          </p>
        </section>

        {/* Pairs well with */}
        <section>
          <SectionHeading>Pairs well with</SectionHeading>
          <p className="text-stone-700 text-sm leading-relaxed mt-2">
            {food.pairsWith}
          </p>
        </section>

        {/* Daily log toggle */}
        <DailyCheckmark id={food.id} hasEaten={hasEaten} toggleEaten={toggleEaten} />

        {/* Fun fact — visually distinct tinted box */}
        <section>
          <SectionHeading>Did you know?</SectionHeading>
          <div className="mt-2 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3.5">
            <p className="text-stone-700 text-sm leading-relaxed">
              {food.funFact}
            </p>
          </div>
        </section>

        {/* Image credit — required by Unsplash guidelines */}
        <p className="text-stone-400 text-xs pt-2">
          Photo by {food.imageCredit}
        </p>

      </div>
    </div>
  )
}
