import SearchBar from "./SearchBar";
import "./styles/styles.css"

export default function NavBar() {

    return (
        <div className="navbar">
                <a href="/home/dogs">Home</a>
                <a href="/home/dogs/create">Create Breed</a>
                <div className="header-right">
                    <SearchBar />   
                </div>
        </div>
    )
}