//filtering pokemons by type

import React from "react"

function Filter(props){
const {currentType, pokemonTypes, onClick} = props
return(
    <div className="btn-group col-11">
      <button type="button" className="btn btn-primary dropdown-toggle col-7 offset-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {currentType}
      </button>
      <div className="dropdown-menu col-7 offset-1" >
      {pokemonTypes.map(type =><span key={type} 
                      className="dropdown-item" onClick={()=>onClick(type)}>
                      {type}
                      </span>)}
      </div>
    </div>
)
}

export default Filter