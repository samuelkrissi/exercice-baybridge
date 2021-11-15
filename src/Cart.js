import "./Cart.css";
import CartContext from "./CartContext";
import { useContext } from "react";

function Cart() {
  const { cart } = useContext(CartContext);
  const { totalPrice } = useContext(CartContext);
  const { removeAll } = useContext(CartContext);
  const { addToCart } = useContext(CartContext);
  const { removeFromCart } = useContext(CartContext);
  const { quantityP } = useContext(CartContext);
  const { deleteItem } = useContext(CartContext);
  const cartItem = (
    <ol className="cart-items">
      {cart.map((item) => (
        <li>
          <img src={item.image} alt="" />
          <br />
          <span className="strong">title:</span>
          <br />
          {item.title} <br />
          <span className="strong">price:</span> {item.price}$
          <div>
            <button
              className="buttonCart"
              onClick={() => removeFromCart(item.title)}
            >
              -
            </button>
            <span className="quantity">{quantityP(item.title)}</span>
            <button
              className="buttonCart"
              onClick={() => addToCart(item.title)}
            >
              +
            </button>
            <button
              className="buttonTrashCart"
              onClick={() => deleteItem(item.title)}
            >
              del
            </button>
          </div>
          <br />
        </li>
      ))}
    </ol>
  );

  return (
    <div className="cart">
  <h1>My cart</h1>
      {cartItem}
      <div className="total">
        <span>Total Amount:</span>
        <span>{Math.abs(totalPrice.toFixed(2))}$</span>
      </div>
      <div className="actions">
        <button className="button--alt" onClick={() => removeAll()}>
          Remove All
        </button>
        <button className="button">Order</button>
      </div>
    </div>
  );
}

export default Cart;
