import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Admin from "./pages/admin";
import NotFound from "./pages/notfound";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login login="user" />
        </Route>
        <Route path="/login-admin">
          <Login login="admin" />
        </Route>
        <Route path="/admin">
          <Admin/>
        </Route>
        <Route path="*">
          <NotFound link='/' />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
