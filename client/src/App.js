import "./App.css";
import { Route, Switch } from "react-router-dom";

//PAGES
import LandingPage from "./components/LandingPage";
import Home from "./components/Home.jsx";
import DogDetails from "./components/DogDetails";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home/dogs" component={Home}/>
        <Route exact path="/home/dogs/:id" component={DogDetails}/>
      </Switch>
    </>
  );
}

export default App;
