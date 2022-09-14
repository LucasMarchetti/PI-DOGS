import { Link } from "react-router-dom"
import "../components/styles/styles.css"

export default function LandingPage() {
  return (
    <div className="landing">
      <h1>HENRY DOGS</h1>
      <Link to="/home/dogs">
        <button className="button_begin">
          HOME
        </button>
      </Link>
    </div>
  )
}
