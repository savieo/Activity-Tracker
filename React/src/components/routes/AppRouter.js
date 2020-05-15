import React from "react";
import ReactDOM from "react-dom";
import {
    Route,
    Switch,
    BrowserRouter as Router,
    Redirect
  } from 'react-router-dom'
// import StockMain from '../stock/StockMain';
// import AdminMain from '../admin/AdminMain';
// import PharmacistMain from '../pharmacist/PharmacistMain';
import LoginPage from "../../LoginPage";
import Register from "../../Register";
// import Addproduct from "../stock/Addproduct";
// import Addsupplier from "../stock/Addsupplier";



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
                <Route exact path="/" render={ () => (
                  // <LoginPage onLogin={this.setLoginData}/>)
                  <Register />)
                } />
                {/* <Route exact path="/stockmain" render={ () => (
                  <StockMain loginData={this.loginData}/>)
                } /> */}
               
                
                {/* <Route path="/PharmacistProfile/:uid" component={PharmacistProfile} loginData={this.loginData} />
                <Route path="/UpdateProduct/:product_id" component={UpdateProduct} loginData={this.loginData} />
                <Route path="/changepassword" component={ChangePassword}  loginData={this.loginData}/>
                <Route path="/Updatesupplier/:sid" component={Updatesupplier} loginData={this.loginData}/> */}
                <Route>
                  <Redirect
                      to={{
                          pathname: "/"
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