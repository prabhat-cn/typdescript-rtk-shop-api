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
import { Link } from 'react-router-dom';

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
  console.log('productsList', productsList);

  const singleProduct = useAppSelector((state) => state.products.productItem);
  console.log('singleP', singleProduct);

  const closeModal = () => {
    setIsOpen(false);
  };

  const viewProduct = async (product: Product) => {
    setIsOpen(true);
    dispatch(getProduct(product));
  };

  // const viewProduct = async (id: any) => {
  //   try {
  //     const proSingle = await API.get(`/product/${id}`);
  //     console.log('proSingle', proSingle.data);
  //     setIsOpen(true);
  //     setViewProductData(proSingle.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
                      <h1
                        className="view-p-det"
                        onClick={() => viewProduct(product)}
                      >
                        {product.name}
                      </h1>
                      {/* <h1 onClick={() => viewProduct(parseInt(product.id))}>
                        {product.name}
                      </h1> */}
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
                      <p>
                        Price: <strong>{product.price}</strong>
                      </p>
                      <Link
                        className="btn-class view-det"
                        to={`/viewproduct/${product.id}`}
                      >
                        View Details
                      </Link>
                      &nbsp; &nbsp;
                      <button
                        className="btn-class add-cart"
                        onClick={() => dispatch(addToCart(product.id))}
                      >
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
        <button style={{ float: 'right' }} onClick={closeModal}>
          X
        </button>
        <div className="container inn-modal">
          <h2>{singleProduct?.name}</h2>
          <div className="row">
            <div className="col-xs-4 col-sm-4">
              <img
                className="prev-class"
                src={singleProduct.preview}
                alt={singleProduct?.name}
              />
              <p>
                Brand: <strong>{singleProduct?.brand}</strong>
              </p>
            </div>
            <div className="col-xs-8 col-sm-8">
              <p>Description: {singleProduct?.description}</p>

              <div className="col-xs">
                {singleProduct?.photos &&
                  singleProduct?.photos.map((imgs) => (
                    <img
                      className="sizes top-mar"
                      style={{ width: '60px' }}
                      src={imgs}
                    />
                  ))}

                {singleProduct?.isAccessory == false ? (
                  <>
                    <h4>
                      Type:<span style={{ color: 'red' }}> Not Accessory</span>
                    </h4>
                  </>
                ) : (
                  <>
                    <h4>
                      Type:<span style={{ color: 'green' }}> Accessory</span>
                    </h4>
                  </>
                )}
                <p className="price-css">
                  Price:{' '}
                  <strong style={{ color: 'blue' }}>
                    {singleProduct?.price}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        <button style={{ float: 'right' }} onClick={closeModal}>
          close
        </button>
      </Modal>
      <style>{customPro}</style>
    </>
  );
};

export default Products;

const customPro = `
.col-md-6 {
  display: initial;
}
img.prev-class {
  width: 12rem;
  border: 1px dotted #000;
  border-radius: 10px 0px 10px 0;
}
p.price-css {
  margin-top: 20px;
  font-size: 20px;
}
.top-mar {
  margin: 15px 4px;
}
.container.inn-modal {
  margin-top: 20px;
}
.btn-class {
  justify-content: space-between;
}
.view-det {
  background: #1cafb8;
  color: #fff;
  width: 8px;
  padding: 6px 6px;
  line-height: 3.2;
}
h1.view-p-det:hover {
  color: #8ba435;
}
h1.view-p-det {
  cursor: pointer;
  color: #359da4;
  font-weight: 400;
  font-size: 30px;
  margin-top: 8px;
  transition: all 0.4s ease-in-out;
}
.view-det:hover {
  text-decoration: none;
  color: #fff;
  background: #849b46;
}
`;
