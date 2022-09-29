

export default function Pagination ({ 
                currentPage, 
                prevHandler, 
                nextHandler, 
                items
            }) {
                
    const dogs = items.map((dog, index) => {
        return (
            <li key={dog.id} > {dog.name}</li>
        )
    })
    console.log(dogs)

    return (
        <div>
            
        </div>
    )
}