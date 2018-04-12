import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AutorBox from './Autor'
import BookBox from './Livro'
import Home from './Home'
import './index.css'

import App from './App'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/author" component={AutorBox} />
        <Route path="/book" component={BookBox} />
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
