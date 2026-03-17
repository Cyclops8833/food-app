// Consistent colour per nutrient name — same nutrient always renders the same colour.
const NUTRIENT_COLOURS = {
  'Vitamin C':    'bg-orange-100 text-orange-700',
  'Vitamin A':    'bg-yellow-100 text-yellow-700',
  'Vitamin D':    'bg-amber-100  text-amber-700',
  'Vitamin K':    'bg-lime-100   text-lime-700',
  'Vitamin B12':  'bg-purple-100 text-purple-700',
  'Iron':         'bg-red-100    text-red-700',
  'Calcium':      'bg-blue-100   text-blue-700',
  'Potassium':    'bg-green-100  text-green-700',
  'Magnesium':    'bg-teal-100   text-teal-700',
  'Zinc':         'bg-indigo-100 text-indigo-700',
  'Protein':      'bg-rose-100   text-rose-700',
  'Fibre':        'bg-emerald-100 text-emerald-700',
  'Omega-3':      'bg-cyan-100   text-cyan-700',
  'Antioxidants': 'bg-violet-100 text-violet-700',
  'Healthy Fats': 'bg-yellow-100 text-yellow-700',
  'Folate':       'bg-pink-100   text-pink-700',
}

const DEFAULT_COLOUR = 'bg-slate-100 text-slate-600'

// How many dots to fill for each strength level.
const DOTS = {
  'good':      [true,  false, false],
  'very good': [true,  true,  false],
  'excellent': [true,  true,  true ],
}

/**
 * Displays a single nutrient as a coloured pill with filled/unfilled dot indicators.
 *
 * Props:
 *   name     — nutrient name string (e.g. "Vitamin C")
 *   strength — "good" | "very good" | "excellent"
 */
export default function NutrientBadge({ name, strength }) {
  const colour = NUTRIENT_COLOURS[name] ?? DEFAULT_COLOUR
  const dots   = DOTS[strength] ?? [false, false, false]

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${colour}`}>
      <span>{name}</span>

      {/* Strength dots: ●○○ / ●●○ / ●●● */}
      <span
        className="flex gap-0.5"
        aria-label={`Strength: ${strength}`}
        role="img"
      >
        {dots.map((filled, i) => (
          <span key={i} className={filled ? 'opacity-100' : 'opacity-20'} aria-hidden="true">
            ●
          </span>
        ))}
      </span>
    </div>
  )
}
