

export default function Pagination () {

    const prevHandler = () => {
        console.log("prev")
    }
    const nextHandler = () => {
        console.log("nextHandler")
    }

    return (
        <div>
            <button onClick={prevHandler}>Prev</button>
            <button onClick={nextHandler}>Next</button>
        </div>
    )
}