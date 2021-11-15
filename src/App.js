import './App.css';
import CartContext from "./CartContext";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useLocalStorage from ".//useLocalStorage";



function App() {
  const [cart, setCart] = useLocalStorage("Shopping Cart",[]);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

    function addToCart(title) {
      const myProduct = products.find((p) => p.title === title);
      if (cart.find((p) => p.title === myProduct.title)) {
        setCart(
          cart.map((p) =>
            p.title === myProduct.title ? { ...p, quantity: ++p.quantity } : p
          )
        );
      } else {
        setCart([...cart, { ...myProduct, quantity: 1 }]);
      }
      setTotalItem(totalItem + 1);
      setTotalPrice(totalPrice + myProduct.price);
    }
    
  function removeFromCart(title) {
    const myProduct = cart.find((p) => p.title === title);
    if (myProduct.quantity > 1) {
      setCart(
        cart.map((p) =>
          p.title === myProduct.title ? { ...p, quantity: --p.quantity } : p
        )
      );
    } else {
      --myProduct.quantity;
      setCart(cart.filter((p) => p.title !== myProduct.title));
    }
    setTotalItem(totalItem - 1);
    setTotalPrice(totalPrice - myProduct.price);
  }
  function deleteItem(title) {
    const myProduct = cart.find((p) => p.title === title);
    setTotalItem(totalItem - myProduct.quantity);
    setTotalPrice(totalPrice - myProduct.price * myProduct.quantity);
    myProduct.quantity = 0;
    setCart(cart.filter((p) => p.title !== myProduct.title));
  }
  function quantityP(title) {
    let myProduct = cart.find((p) => p.title === title);
    if (myProduct) {
      return myProduct.quantity;
    } else {
      return 0;
    }
  }
    function removeAll() {
      setCart([]);
      setTotalItem(0);
      setTotalPrice(0);
    }
    const [cartShown, setCartShown] = useState(false);

    





  return (
    <CartContext.Provider
      value={{
        cartShown,
        setCartShown,
        addToCart,
        totalItem,
        totalPrice,
        cart,
        removeFromCart,
        quantityP,
        setCart,
        deleteItem,
        removeAll,

      }}
    >
   <Router>
        <Switch>
          <Route exact path="/">
            <div className="App">
            <span className="shopping-cart">
              <Cart />
              </span>
              <span className="products">
                <Products products={products} />
              </span> 
              
                </div>
          </Route>
      
          <Route path="/products/:id">
            <ProductDetails />
          </Route>
        </Switch>
      </Router>
        </CartContext.Provider>

  );
}

export default App;
