import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import { Header } from './components'

import { 
  Home, 
  Favorites 
} from './pages'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={ROUTES.FAVORITES}>
          <Favorites/>
        </Route>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
