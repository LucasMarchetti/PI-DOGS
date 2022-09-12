import React from "react"
import { Link } from "react-router-dom"
import "../components/styles/styles.css"
// import { useDispatch } from "react-redux"
// import { getDogs } from "../redux/actions"

function LandingPage() {
  // const dispatch = useDispatch()

  return (
    <div className="landing">
      <h1>HENRY DOGS</h1>
      <Link to="/home/dogs">
        <button className="button_begin" >
          HOME
        </button>
      </Link>
    </div>
  )
}

export default LandingPage
