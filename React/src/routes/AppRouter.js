import React from "react";
import {
    Route,
    Switch,
    BrowserRouter as Router,
    Redirect
  } from 'react-router-dom'
import UpdateActivity from '../components/UpdateActivity';
  // …
  class AppRouter extends React.Component {
    constructor() {
      super();
      this.setLoginData.bind(this);
      this.loginData = {};
    }

    setLoginData(loginData) {
      console.log("Login data", loginData);
      this.loginData = loginData;
    }


    render() {
      return (
        <Router>  
          <div>
              <Switch>
                <Route path="/updateactivity/:act_id" component={UpdateActivity} />
                <Route>
                  <Redirect
                      to={{
                          pathname: "/updateactivity/45"
                      }}
                  />
                </Route>
              </Switch>
            </div>
        </Router>
      );
    }
  }  
export default AppRouter;