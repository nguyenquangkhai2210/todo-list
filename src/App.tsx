import 'src/styles/App.css';

import React from 'react';
import {BrowserRouter, Switch, Route, Redirect, RouteComponentProps} from 'react-router-dom';

/* Components */
import SignInPage from 'src/pages/SignInPage';
import ToDoPage from 'src/pages/ToDoPage';

function App() {
  const renderComponent = (props: RouteComponentProps) => {
    const token = localStorage.getItem("token");
    const isAuthenticated = token !== null && token !== undefined;
  
    if (isAuthenticated) {
      return <ToDoPage {...props}/>
    }
    return  <Redirect to="/"/>
  }

  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage}/>
          <Route path="/todo" render={renderComponent}/>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
