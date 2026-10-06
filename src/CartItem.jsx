import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

export default function CartItem({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const itemTotal = (item) => item.cost * item.quantity;
  const calculateTotalAmount = () => items.reduce((sum, item) => sum + itemTotal(item), 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleCheckout = () => alert('Coming Soon');

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <h3 className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</h3>

      {items.length === 0 && <p>Your cart is empty.</p>}

      {items.map((item) => (
        <div className="cart-row" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="cart-info">
            <h4>{item.name}</h4>
            <p>Unit price: ${item.cost}</p>
            <div className="qty">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p>Total: ${itemTotal(item)}</p>
          </div>
          <button className="delete" onClick={() => dispatch(removeItem(item.name))}>Delete</button>
        </div>
      ))}

      <div className="cart-actions">
        <button className="btn" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="btn" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}
