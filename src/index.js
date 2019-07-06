import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from "./pages/App";
import Context from './context'
import CreateTour from './pages/CreateTour'
import Reducer from './reducer'
import Splash from "./pages/Splash";
import ProtectedRoute from './ProtectedRoute'
import ToursList from './pages/ToursList'
import StagesList from './pages/StagesList'
import CreateStage from './pages/CreateStage'
import CurrentStage from './pages/CurrentStage'
import NewActivity from './pages/NewActivity'
import UserProfile from './pages/UserProfile'
import TeamProfile from './pages/TeamProfile'

import "mapbox-gl/dist/mapbox-gl.css";
import * as serviceWorker from "./serviceWorker";

const wsLink = new WebSocketLink({
  uri: 'wss://pushup-bam.herokuapp.com/graphql',
  options: {
    reconnect: true
  }
})

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache()
})

const Root = () => {
  const initialState = useContext(Context)

  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    <Router>
      <ApolloProvider client={client}>
        <Context.Provider value={{ state, dispatch }}>
          <Switch>
            <ProtectedRoute exact path="/" component={App} />
            <ProtectedRoute exact path="/tours" component={ToursList} />
            <ProtectedRoute exact path="/create-tour" component={CreateTour} />
            <ProtectedRoute path="/tours/:id" component={StagesList} />
            <ProtectedRoute path="/stages/:id/edit" component={CreateStage} />
            <ProtectedRoute exact path="/current-stage" component={CurrentStage} />
            <ProtectedRoute exact path="/new-activity" component={NewActivity} />
            <ProtectedRoute path="/users/:id" component={UserProfile} />
            <ProtectedRoute path="/teams/:id" component={TeamProfile} />
            <Route path="/login" component={Splash} />
          </Switch>
        </Context.Provider>
      </ApolloProvider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
