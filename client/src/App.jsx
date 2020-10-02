import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantDetails from "./routes/RestaurantDetails";
import RestaurantUpdate from "./routes/RestaurantUpdate";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/restaurants/:id/update"
            component={RestaurantUpdate}
          />
          <Route exact path="/restaurants/:id" component={RestaurantDetails} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
