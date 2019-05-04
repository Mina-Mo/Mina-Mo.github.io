// for one single pokemon item

import React, {Component} from "react"
import PokemonData from "./PokemonData";

class SinglePokemon extends Component{  
    render(){
        const {image, types, name, pokemonId, pokemons, currentPokemon} = this.props
        return(
        <div className="col-md-4 mb-4 " 
            data-toggle="modal" 
            data-target=".bd-example-modal-sm" 
            // handling pokemon data onClick
            onClick={()=>this.props.onClick(pokemonId)}> 
          <div className="card shadow-sm">

            {/* pokemon image */}
            <img src={image}width="50%" height="130" className="mx-auto" alt={`${name}`}/> 

            {/* pokemon data will be retuen onClick          */}
            <PokemonData pokemons={pokemons} currentPokemon={currentPokemon}/>

            {/* pokemon name */}
            <h4 className="mt-3 mx-auto">{name}</h4>
            <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group ml-2 mb-2">

            {/* pokemon types */}
                {types.map(type=> <button key={type.slot}type="button" 
                                         className="btn btn-sm btn-outline-secondary">
                                        {type.type.name}
                                        </button>)}
                </div>
            </div>
         </div>
        </div>
        )
    }
}

export default SinglePokemon;