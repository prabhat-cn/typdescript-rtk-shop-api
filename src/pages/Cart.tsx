import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/reducers/hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {
  getPriceTotal,
  removeFromCart,
  updateQuantity,
} from '../store/reducers/CartSlice';
import styles from './Cart.module.css';

const Cart: React.FC = () => {
  interface RouteParams {
    id: string;
  }
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  console.log('cart-pro', products);
  const [fullQuantity, setFullQuantity] = useState();

  const items = useAppSelector((state) => state.cart.items);
  console.log('items', items);
  const totalPrice = useAppSelector(getPriceTotal);

  const onChangeQuantity = (
    event: React.FocusEvent<HTMLInputElement>,
    id: string
  ) => {
    const quantity: any = Number(event.target.value) || 0;
    setFullQuantity(quantity);
    dispatch(updateQuantity({ id, quantity }));
    if (quantity == 0) {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      {items.length || fullQuantity === 0 ? (
        <>
          <p>No Product Found!</p>
        </>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Picture</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(items).map(([id, quantity]) => (
                <tr key={products[id]?.id}>
                  <td>
                    <LazyLoadImage
                      style={{ width: '50px' }}
                      src={products[id]?.preview}
                      alt={products[id]?.name}
                      delayTime={500}
                      effect="blur"
                    />
                  </td>
                  <td>{products[id]?.name}</td>
                  <td>
                    <input
                      type="text"
                      className={styles.input}
                      defaultValue={quantity}
                      onBlur={(e) => onChangeQuantity(e, id)}
                    />
                  </td>
                  <td>$&nbsp;{products[id].price}</td>
                  <td>
                    <button
                      aria-label={`Remove ${products[id].name} Magnifying Glass from Shopping Cart`}
                      onClick={() => dispatch(removeFromCart(id))}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td></td>
                <td className={styles.total}>$&nbsp;{totalPrice}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </main>
  );
};

export default Cart;
