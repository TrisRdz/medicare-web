import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/Home/home';
import Header from './layout/header'

function App() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header />
      <div style={{ paddingInline: 100 }}>
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
