// for loading more pokemons in the page

import React from "react"

function LoadMore(props){
    const {onClick, pageLimit} = props
    return(
        <div className="row">
            <button className="btn btn-primary btn-lg  mx-auto col-10" 
                    onClick={()=>onClick(pageLimit)}>
                    Load More...
                    </button>
        </div>
    )
}

export default LoadMore;