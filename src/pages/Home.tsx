import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome To Our Store</h1>
      <Link to="/products">
        <img
          className="home-cart"
          src="cart-e.jpeg"
          alt="Welcome To Our Store"
        />
      </Link>

      <h3>Please click on the image and show the products</h3>
      <style>{homeCss}</style>
    </div>
  );
};

export default Home;

const homeCss = `
img.home-cart {
  width: 40rem;
  border: 2px solid #000;
  border-radius: 18px;
}`;
