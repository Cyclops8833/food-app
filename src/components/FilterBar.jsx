// All filter options in display order.
const FILTERS = [
  'All',
  'Fruit',
  'Vegetable',
  'Meat & Fish',
  'Dairy',
  'Grains & Legumes',
  'Other',
  'Favourites',
]

/**
 * Horizontally scrollable row of filter pills.
 *
 * Props:
 *   activeFilter          — the currently selected filter string
 *   setActiveFilter(str)  — updates the active filter in the parent
 */
export default function FilterBar({ activeFilter, setActiveFilter }) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none px-4 py-3">
      {FILTERS.map(filter => {
        const isActive = filter === activeFilter
        return (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`
              whitespace-nowrap px-4 rounded-full text-sm font-medium
              min-h-[48px] transition-colors duration-150 border
              ${isActive
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white text-stone-600 border-stone-200 active:bg-stone-50'
              }
            `}
          >
            {filter}
          </button>
        )
      })}
    </div>
  )
}
