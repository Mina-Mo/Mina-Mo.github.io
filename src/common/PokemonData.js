//show up single pokemon data

import React, {Component} from "react"

class PokemonData extends Component{
    render(){
        //get current pokemon id
       const {currentPokemon} = this.props

       // get the current pokmon data
       const pokemon = this.props.pokemons.filter(poke=>poke.data.id===currentPokemon)
    return(
            <div className="modal fade bd-example-modal-sm" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
            <div className="modal-content">
                <div className="m-2">

                {/* mapping the current pokemon data in table */}
                {pokemon.map(poke=>
                // pokemon id
                     <div className="card shadow-sm" key={poke.data.id}>
                {/* pokemon image */}
                     <img src={poke.data.sprites.front_default}width="50%" height="130" alt={`${poke.data.name}`} className="mx-auto"/>           
                     <div className="card-body"></div>
                {/* pokemon title displayed with  name & id*/}    
                     <h3 className="mt-3 mx-auto">{`${poke.data.name} #${poke.data.id}`}</h3>
                     {/* table data */}
                      <table className="table">
                         <tbody>
                             <tr>
                             <th>Type</th>  
                             {poke.data.types.map(type=><td key={type.type["name"]}>{type.type["name"]}</td>)}
                             </tr>
                             <tr>    
                             <th>Attack</th>
                                 <td>{poke.data.stats[4].base_stat}</td>
                             </tr>
                             <tr>
                             <th>Defense</th>
                                 <td>{poke.data.stats[3].base_stat}</td>
                             </tr>
                             <tr>
                             <th>HP</th>
                                 <td>{poke.data.stats[5].base_stat}</td>
                             </tr>
                             <tr>
                             <th>SP Attack</th>
                                 <td>{poke.data.stats[2].base_stat}</td>
                             </tr>
                             <tr>
                             <th>SP Defense</th>
                                 <td>{poke.data.stats[1].base_stat}</td>
                             </tr>
                             <tr>
                             <th>Speed</th>
                                 <td>{poke.data.stats[0].base_stat}</td>
                             </tr>
                             <tr>
                             <th>Weight</th>
                                 <td>{poke.data.weight}</td>
                             </tr>
                             <tr>
                             <th>Total Moves</th>
                                 <td>{poke.data.moves.length}</td>
                             </tr>
                         </tbody>
                      </table>
                      <div className="d-flex justify-content-between align-items-center">
                     <div className="btn-group">
                     {poke.data.types.map(type=> <button key={type.slot}type="button" 
                                    className="btn btn-sm btn-outline-secondary">
                                    {type.type.name}
                                    </button>)}
                        </div>
                        </div>
                    </div>)}                       
                </div>
            </div>
            </div>
            </div>
    )
    }
}

export default PokemonData