import React from 'react';
import { BrowserRouter, Route , Redirect, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Boards from './component/Boards';
import EachBoard from './component/EachBoard';
import Navigation from './component/Navigation';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navigation></Navigation>
        <Switch>
        <Route exact path="/">
              <Redirect to="/boards" />
            </Route>
          <Route exact path="/boards" component={Boards}></Route>
          <Route exact path='/boards/:boardId' component={EachBoard}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
