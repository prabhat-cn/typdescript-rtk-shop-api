import { Link } from 'react-router-dom';
import CartIcon from '../pages/CartIcon';
import styles from './Nav.module.css';

const Navmenu: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <nav>
          <Link className={styles.navLink} to="/">
            Home
          </Link>
          <Link className={styles.navLink} to="/products">
            Products
          </Link>
          <CartIcon />
        </nav>
      </header>
    </div>
  );
};

export default Navmenu;
