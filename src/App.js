import { EasybaseProvider } from 'easybase-react';
import { BrowserRouter, HashRouter, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import AuthButton from './components/AuthButton';
import Goals from './components/Goals';

const ebconfig = {
  "integration": process.env.REACT_APP_EBCONFIG_INTEGRATION,
  "version": process.env.REACT_APP_EBCONFIG_VERSION
}

function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <BrowserRouter>
        <div style={ { display: "flex", justifyContent: "space-evenly", borderBottom: "1px grey solid" } }>
          <Link to="/"><h2>Home</h2></Link>
          <Link to="/goals"><h2>Goals</h2></Link>
        </div>
        <AuthButton />
        <Switch>
          <Route path="/" exact>
            <Home />           
          </Route>
          <Route path="/goals" exact>
            <Goals />
          </Route>
        </Switch>
      </BrowserRouter>
    </EasybaseProvider>
  );
}

export default App;
