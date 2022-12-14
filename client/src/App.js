import "./App.css"
import { Route, Switch } from "react-router-dom"

//PAGES
import LandingPage from "./components/LandingPage"
import Dogs from "./components/Dogs"
import CreateDog from "./components/CreateDog"

//COMPONENTS
import DogDetails from "./components/DogDetails"
import NavBar from "./components/NavBar"

function App() {
  return (
    <>
      <Switch>

        <Route exact path="/" component={LandingPage}/>
        
        <Route path="/" >
          <NavBar />
          <Route exact path="/home/dogs" component={Dogs}/>
          <Route exact path="/home/dogs/id/:id" component={DogDetails}/>
          <Route exact path="/home/dogs/create" component={CreateDog} />
        </Route>
      
      </Switch>
    </>
  )
}

export default App
