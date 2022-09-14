import "./App.css"
import { Route, Switch } from "react-router-dom"

//PAGES
import LandingPage from "./components/LandingPage"
import Dogs from "./components/Dogs"
// import Home from "./components/Home.jsx"
// import DogDetails from "./components/DogDetails"

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home/dogs" component={Dogs}/>
        {/* <Route exact path="/home/dogs/:id" component={DogDetails}/> */}
      </Switch>
    </>
  )
}

export default App
