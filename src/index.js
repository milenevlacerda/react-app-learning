import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AutorBox from './Autor'
import Home from './Home'
import './index.css'

import App from './App'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      {/* <Route path="/" component={Home} /> */}
      <Route path="/author" component={AutorBox} />
      <Route path="/book" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
