import { useEffect, useState } from "react";
import "./Recipes.css";

export default function Recipes() {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch recipes");
        }
        return res.json();
      })
      .then((data) => {
        setRecipes(data.recipes);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>🍲 Recipe Explorer</h1>

      {loading && <p className="loading">Loading recipes...</p>}
      {error && <p className="error">{error}</p>}

      <div className="recipe-grid">
        {!loading && !error &&
          recipes.map((recipe) => (
            <div className="card" key={recipe.id}>
              

              <img 
                src={recipe.image} 
                alt={recipe.name} 
                className="recipe-img"
              />

              <div className="card-content">
                <h3>{recipe.name}</h3>
                <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                <p><strong>Rating:</strong> ⭐ {recipe.rating}</p>
                <p><strong>Cooking Time:</strong> ⏱️ {recipe.cookTimeMinutes} mins</p>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  );
}