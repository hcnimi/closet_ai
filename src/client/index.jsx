import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers/index.jsx';
import ClosetBoard from './components/ClosetBoard/ClosetBoard.jsx';
import MyCloset from './components/MyCloset/MyCloset.jsx';
import CreateOutfits from './components/CreateOutfits/CreateOutfits.jsx';
import RecommendedOutfits from './components/ClosetBoard/RecommendedOutfits.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import AddItem from './components/AddItem/AddItem.jsx';
import {Provider} from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
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

const DefaultLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        <Header />
        <Component {...matchProps} />
      </div>
    )} />
  )
};

// passes referring path to login component via Redirect 'state'
const ProtectedLayout = ({component: Component, ...rest}) => {
  return (
    store.getState().userInfo.isAuthenticated === true ?
    (
      <div className="ProtectedLayout">
        <Header/>
        <Component {...rest} />
      </div>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: rest.path
      }}/>
    )
  );
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
              <Switch>
                <DefaultLayout exact={true} path="/" component={ClosetBoard} store={store} />
                <DefaultLayout exact={true} path="/signup" component={Signup} store={store} />
                <DefaultLayout exact={true} path="/login" component={Login} store={store} />
                <ProtectedLayout exact={true} path="/mycloset" component={MyCloset} store={store} />
                <ProtectedLayout exact={true} path="/closetboard" component={ClosetBoard} store={store} />
                <ProtectedLayout exact={true} path="/recommendedoutfits" component={RecommendedOutfits} store={store} />
                <ProtectedLayout exact={true} path="/createoutfits" component={CreateOutfits} store={store} />
                <ProtectedLayout exact={true} path="/additem" component={AddItem} store={store} />
              </Switch>
            </div>
          </Provider>
        </Router>
      </div>
    )
  }
}

const AppWithRouter = withRouter(App);
ReactDOM.render(<App pathname={location.pathname} />, document.getElementById('root'));
