import { useState } from "react";
import { postOrders } from "../../apiCalls";

function OrderForm({addOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  

  function handleSubmit(e) {
    e.preventDefault();
    const newOrder = {
      name,
      ingredients,
    }
    newOrder.name && 
      newOrder.ingredients.length && 
      postOrders(newOrder)
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          addOrder(newOrder)
          return res.json()
        })
        .catch(err => console.log(err))
    clearInputs();
  }

  function addIngredient(e) {
    e.preventDefault();
    setIngredients([...ingredients, e.target.name])
  }

  function addName(e) {
    setName(e.target.value)
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={(e) => addIngredient(e)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => addName(e)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button name="submit order" onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
