import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index.jsx';
import ClosetBoard from './components/ClosetBoard/ClosetBoard.jsx';
import MyCloset from './components/MyCloset/MyCloset.jsx';
import CreateOutfits from './components/CreateOutfits/CreateOutfits.jsx';
import RecommendedOutfits from './components/ClosetBoard/RecommendedOutfits.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import AddItem from './components/AddItem/AddItem.jsx';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
} from 'react-router-dom';
import thunk from 'redux-thunk';

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const store = createStore(
  reducers,
  applyMiddleware(...middlewares)
);

const PrivateRoute = ({ component: Component, ...rest }) => { //todo: handle private route
  return (
    <Route {...rest} render={matchProps => (
      <div className="PrivateRoute">

        <Component {...matchProps} />
      </div>
    )} />
  )
};

const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        <Header />
        <Component {...matchProps} />
      </div>
    )} />
  )
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <Provider store={store}>
            <div className="content container">
              <DefaultLayout exact={true} path="/" component={ClosetBoard} store={store} />
              <PrivateRoute exact={true} path="/signup" component={Signup} store={store} />
              <PrivateRoute exact={true} path="/login" component={Login} store={store} />
              <DefaultLayout exact={true} path="/mycloset" component={MyCloset} store={store} />
              <DefaultLayout exact={true} path="/closetboard" component={ClosetBoard} store={store} />
              <DefaultLayout exact={true} path="/recommendedoutfits" component={RecommendedOutfits} store={store} />
              <DefaultLayout exact={true} path="/createoutfits" component={CreateOutfits} store={store} />
              <DefaultLayout exact={true} path="/additem" component={AddItem} store={store} />
            </div>
          </Provider>
        </Router>
      </div>
    )
  }
}

const AppWithRouter = withRouter(App);
ReactDOM.render(<App pathname={location.pathname} />, document.getElementById('root'));
