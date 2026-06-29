import MealBar from "./ui/MealBar"

const MealsDay = ({ day }: { day: 'today' | 'yesterday' }) => {
  return (
    <div className="bg-white shadow-md shadow-gray-200 border border-gray-200/50 rounded-2xl flex flex-col justify-around items-center p-3 gap-3">
      <h2 className="text-4xl font-bold tracking-wide self-start">Meals { day }</h2>
      <MealBar
        emoji="🍳"
        meal="Breakfast"
        food="Eggs, bread"
        calories={600}
      />
      <MealBar
        emoji="🍲"
        meal="Lunch"
        food="Beans, bread"
        calories={1100}
      />
      <MealBar
        emoji="🥪"
        meal="Dinner"
        food="Tuna sandwitch"
        calories={600}
      />
      <MealBar
        emoji="🍫"
        meal="Snack"
      />
    </div>
  )
}

export default MealsDay