import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CssFolder/Shop.css';

function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ margin: "50%" }}><img src="Loading.gif" alt="Loading..." /></div>;
  }

  return (
    <div>
      <header className="hero-section">
        <h1>Shop Our Products</h1>
        <p>Explore all gadgets, electronics, and accessories</p>
      </header>

      <section className="products-section">
        <h2>All Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/ProductDetails/${product.id}`}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
              </Link>
              <p className="price">₹{product.price}</p>
              <button className="buy-btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Shop;
