import { useContext } from "react";
import CartContext from "./CartContext";
import "./Product.css";
import { Link } from "react-router-dom";

function Product({ id, image, description, title, price }) {
  const { addToCart } = useContext(CartContext);


  return (
    <div className="product-card">
      <div className="product-image">
        <div className="container">
          <img src={image} alt={title} title={description} />         
        </div>
      </div>

      <div className="product-info" title="More Details">
      <Link to={`/products/${id}`}><h5>{title}</h5></Link>
        <h6>{price}$</h6>
      </div>
      <button className="buttonCart1" onClick={() => addToCart(title)}>
        +
      </button>
    </div>
  );
}

export default Product;
