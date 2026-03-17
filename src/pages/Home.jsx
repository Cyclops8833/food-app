import { useSearchParams } from 'react-router-dom'
import foods from '../data/foods.json'
import { useFavourites } from '../hooks/useFavourites'
import { useDailyLog } from '../hooks/useDailyLog'
import FoodCard from '../components/FoodCard'
import FilterBar from '../components/FilterBar'
import SearchBar from '../components/SearchBar'

export default function Home() {
  // Encode filter and search in the URL so the browser restores them on back-navigation.
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = searchParams.get('filter') || 'All'
  const searchQuery  = searchParams.get('q')      || ''

  const setActiveFilter = (filter) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (filter === 'All') next.delete('filter')
      else next.set('filter', filter)
      return next
    }, { replace: true })
  }

  const setSearchQuery = (q) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (!q) next.delete('q')
      else next.set('q', q)
      return next
    }, { replace: true })
  }

  const { favourites, toggleFavourite, isFavourite } = useFavourites()
  const { hasEaten } = useDailyLog()

  // Apply search and category filter simultaneously.
  const visibleFoods = foods.filter(food => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())

    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Favourites' && favourites.includes(food.id)) ||
      food.category === activeFilter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── Header ── */}
      <header className="px-4 pt-10 pb-5">
        <h1 className="text-4xl font-extrabold tracking-tight text-green-500">
          Nourish
        </h1>
        <p className="text-sm text-stone-400 mt-1">Your food guide</p>
      </header>

      {/* ── Search ── */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* ── Filter pills ── */}
      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      {/* ── Food grid ── */}
      <main className="px-4 pb-10">
        {visibleFoods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-stone-500 font-medium">No foods found</p>
            <p className="text-stone-400 text-sm mt-1">
              {activeFilter === 'Favourites'
                ? 'Tap the heart on any food to add it to your favourites.'
                : 'Try a different search or filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {visibleFoods.map(food => (
              <FoodCard
                key={food.id}
                food={food}
                isFavourite={isFavourite(food.id)}
                toggleFavourite={toggleFavourite}
                isEaten={hasEaten(food.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
