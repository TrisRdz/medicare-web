import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './layout/header'

import HomePage from './pages/home/home';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';

function App() {
  return (
    <div className='appContainer'>
      <Header />
      <div style={{ padding: 100 }}>
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
