import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Header from './layout/header'

import HomePage from './pages/home/home';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';
import UserPage from './pages/profile/profile';

function App() {
  return (
    <RecoilRoot>
      <div className='appContainer'>
        <Router>
          <Header />
          <div style={{ padding: 100 }}>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/register' component={RegisterPage} />
              <Route exact path='/profile' component={UserPage} />
            </Switch>
          </div>
        </Router>
      </div>
    </RecoilRoot>
  );
}

export default App;
