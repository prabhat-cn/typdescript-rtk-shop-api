import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Home: React.FC = () => {
  return (
    <div className="home-center">
      <h1>Welcome To Our Store</h1>
      <Link to="/products">
        <LazyLoadImage
          className="home-cart"
          src="cart-e.jpeg"
          alt="Welcome To Our Store"
          delayTime={500}
          effect="blur"
        />
      </Link>

      <h3>Please click on the image and show the products</h3>
      <style>{homeCss}</style>
    </div>
  );
};

export default Home;

const homeCss = `
.home-center {
  text-align: center;
}
img.home-cart {
  width: 40rem;
  border: 2px solid #000;
  border-radius: 18px;
}`;
