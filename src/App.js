import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home} from "./components/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path={'/'}><Home/></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
