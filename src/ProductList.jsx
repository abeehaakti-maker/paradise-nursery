import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const imageFor = (name) => `/images/${name.toLowerCase().replace(/ /g, '-')}.svg`;
const build = (list) =>
  list.map(([name, cost, description]) => ({ name, cost, description, image: imageFor(name) }));

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: build([
      ['Snake Plant', 15, 'Produces oxygen at night and removes toxins.'],
      ['Spider Plant', 12, 'Filters formaldehyde and xylene from the air.'],
      ['Peace Lily', 18, 'Removes mold spores and brightens any room.'],
      ['Boston Fern', 20, 'Adds humidity and removes pollutants.'],
      ['Rubber Plant', 17, 'Large glossy leaves that purify indoor air.'],
      ['English Ivy', 14, 'Reduces airborne mold and filters toxins.'],
    ]),
  },
  {
    category: 'Aromatic and Medicinal Plants',
    plants: build([
      ['Lavender', 20, 'Calming scent that helps you relax and sleep.'],
      ['Mint', 8, 'Fresh aroma, great for tea and cooking.'],
      ['Rosemary', 12, 'Fragrant herb used in cooking and aromatherapy.'],
      ['Basil', 10, 'Sweet, peppery herb for kitchen use.'],
      ['Aloe Vera', 14, 'Soothing gel helps heal minor burns and skin irritation.'],
      ['Lemon Balm', 9, 'Lemon scented herb that eases stress.'],
    ]),
  },
  {
    category: 'Low Maintenance Plants',
    plants: build([
      ['Jade Plant', 13, 'A hardy succulent that needs little water.'],
      ['Echeveria', 11, 'Rosette shaped succulent, easy to care for.'],
      ['Cactus', 9, 'Thrives on sunlight and very little attention.'],
      ['ZZ Plant', 25, 'Tolerates low light and irregular watering.'],
      ['Pothos', 10, 'Fast growing trailing vine for any room.'],
      ['Haworthia', 12, 'Small striped succulent that stays compact.'],
    ]),
  },
];

export default function ProductList({ onHome }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <nav className="navbar">
        <div className="brand" onClick={onHome}>Paradise Nursery</div>
        <div className="nav-links">
          <button className="link" onClick={onHome}>Home</button>
          <button className="link" onClick={() => setShowCart(false)}>Plants</button>
          <button className="link cart-link" onClick={() => setShowCart(true)}>
            Cart 🛒 <span className="cart-count">{totalItems}</span>
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid">
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="cards">
                {group.plants.map((plant) => {
                  const added = cartItems.some((item) => item.name === plant.name);
                  return (
                    <div className="card" key={plant.name}>
                      <img src={plant.image} alt={plant.name} />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p className="price">${plant.cost}</p>
                      <button
                        className="btn"
                        disabled={added}
                        onClick={() => dispatch(addItem(plant))}
                      >
                        {added ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
