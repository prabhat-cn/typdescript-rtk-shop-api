import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Navmenu from './constants/Navmenu';
import Home from './pages/Home';
import Products from './pages/Products';

function App() {
  return (
    <div className="App">
      <Navmenu />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>

        <Route exact path="/cart">
          {/* <Cart /> */}
        </Route>

        <Route exact path="*">
          No page found!!
        </Route>
      </Switch>
    </div>
  );
}

export default App;
