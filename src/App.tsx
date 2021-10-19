import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Navmenu from './constants/Navmenu';
import Home from './pages/Home';
import Products from './pages/Products';
import ViewProduct from './pages/ViewProduct';

function App() {
  return (
    <>
      <Navmenu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/viewproduct/:id" component={ViewProduct} />

        {/* <Route exact path="/cart" component={Cart} /> */}

        <Route exact path="*">
          No page found!!
        </Route>
      </Switch>
    </>
  );
}

export default App;
