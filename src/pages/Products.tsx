/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';

import Modal from 'react-modal';
import styles from './Products.module.css';
import { useAppSelector, useAppDispatch } from '../store/reducers/hooks';
import {
  listProducts,
  Product,
  getProduct,
} from '../store/actions/ProductAction';

import { addToCart } from '../store/reducers/CartSlice';
import ProductImage from './ProductImage';
import API from '../api';

const Products: React.FC = () => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [viewProductData, setViewProductData] = useState<Product>();

  const dispatch = useAppDispatch();
  const productsList = useAppSelector((state) => state.products.productsItem);

  const singleProduct = useAppSelector((state) => state.products.productItem);
  console.log('singleP', singleProduct);

  const closeModal = () => {
    setIsOpen(false);
  };

  // const viewProduct = async (product: Product) => {
  //   setIsOpen(true);
  //   dispatch(getProduct(product));
  // };

  const viewProduct = async (id: any) => {
    try {
      const proSingle = await API.get(`/product/${id}`);
      console.log('proSingle', proSingle.data);
      setIsOpen(true);
      // setViewProductData(proSingle.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return (
    <>
      <div>
        <main className="page">
          <ul className={styles.products}>
            {productsList &&
              productsList?.map((product: Product, index) => (
                <li key={product.id}>
                  {/* <ProductImage /> */}
                  <div className="col-xs">
                    {product.photos &&
                      product.photos.map((imgs) => (
                        <img
                          className="sizes"
                          style={{ width: '60px', margin: '0 4px' }}
                          src={imgs}
                        />
                      ))}
                  </div>
                  <article className={styles.product}>
                    <figure>
                      <img src={product.preview} alt={product.name} />
                      <figcaption className={styles.caption}>
                        {product.name}
                      </figcaption>
                    </figure>
                    <div>
                      {/* <h1 onClick={() => viewProduct(product)}>
                        {product.name}
                      </h1> */}
                      <h1 onClick={() => viewProduct(parseInt(product.id))}>
                        {product.name}
                      </h1>
                      <h4>{product.brand}</h4>
                      {product.isAccessory == false ? (
                        <h4 style={{ color: 'red' }}>Not Accessory</h4>
                      ) : (
                        <h4 style={{ color: 'green' }}>Accessory</h4>
                      )}
                      <p>{product.description}</p>
                      <select>
                        {product.size &&
                          product.size.map((sizeValue) => (
                            <option value={sizeValue}>{sizeValue}</option>
                          ))}
                      </select>
                      <p>{product.price}</p>
                      <button onClick={() => dispatch(addToCart(product.id))}>
                        Add to Cart
                      </button>
                    </div>
                  </article>
                </li>
              ))}
          </ul>
        </main>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="View Product"
      >
        <h2>Product Details</h2>
        <div>I am a modal</div>

        <button style={{ float: 'right' }} onClick={closeModal}>
          close
        </button>
      </Modal>
    </>
  );
};

export default Products;
