import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CartIcon.module.css';
import { useAppSelector } from '../store/reducers/hooks';
import { getMemorizedNumItems } from '../store/reducers/CartSlice';

const CartIcon = () => {
  const numItems = useAppSelector(getMemorizedNumItems);
  return (
    <Link to="/cart" className={styles.link}>
      <span className={styles.text}>
        🛒&nbsp;&nbsp;{numItems ? numItems : 'Cart'}
      </span>
    </Link>
  );
};

export default CartIcon;
