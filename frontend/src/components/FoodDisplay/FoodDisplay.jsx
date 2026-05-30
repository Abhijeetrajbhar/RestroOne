import { useContext, useMemo } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = ({category, searchQuery = ""}) => {

  const {food_list = []} = useContext(StoreContext);
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredFoodList = useMemo(() => {
    if (!Array.isArray(food_list)) {
      return [];
    }

    return food_list.filter((item) => {
      const matchesCategory = category === 'All' || category === item.category;
      const searchableText = `${item.name ?? ''} ${item.description ?? ''} ${item.category ?? ''}`.toLowerCase();
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [category, food_list, normalizedSearch]);

  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-heading">
        <h2>{normalizedSearch ? `Search results for "${searchQuery.trim()}"` : "Top dishes near you"}</h2>
        {normalizedSearch ? <p>{filteredFoodList.length} matching dishes found</p> : null}
      </div>
      <div className='food-display-list'>
        {Array.isArray(food_list) && food_list.length > 0 ? (
          filteredFoodList.length > 0 ? (
            filteredFoodList.map((item) => (
              <FoodItem
                key={item._id}
                image={item.image}
                name={item.name}
                desc={item.description}
                price={item.price}
                id={item._id}
              />
            ))
          ) : (
            <p className="food-display-empty">No dishes match your search. Try a different name, ingredient, or category.</p>
          )
        ) : (
          <p>No dishes available yet.</p>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
