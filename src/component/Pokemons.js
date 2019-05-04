// main pokemon component

import React, {Component} from "react"
import {getSinglePokemon} from "../Service/http"
import SinglePokemon from "../common/SinglePokemon"
import LoadMore from "../common/LoadMore";
import Header from "./Header";
import {pokemonList} from "../utilites/pokemonList"


class Pokemons extends Component{
   state={
        data:[],   //getting all pokemons in array of objects
        isloaded: false,  // checking if the component is loaded
        currentPokemon:"",  // current pokemon ID
        pageLimit: 12,   // pokemons page limit
        currentItems:[],
        //pokemon types/categeries
        pokemonTypes:["All","poison", "water", "grass", "fire", "bug", "normal", "electronic", 
                        "ground", "fairy","figthing"],
        currentType: "All" // current pokemon type
}


 LoadData=async(pageLimit)=>{   // getting array of objects for pokemons 
    try{
            const list = pokemonList(pageLimit)  // function to get a limited array of pokemons for each page
                list.forEach(async(poke)=>{
                    const pokemon = await getSinglePokemon(poke)        //calling API
                    this.setState({data: [...this.state.data, pokemon]})  //adding to the state what we got from server
                    this.setState({isloaded: true})
            })
    }catch(error){  // handling error
        if(error.data.response.status(404)){
            alert("The required request is not found.")
        }
    }
}


// calling loadData method to fetch the data
componentDidMount(){this.LoadData(this.state.pageLimit, 20)}

// handling current pokemin
handleClick=(pokeId)=>this.setState({currentPokemon: pokeId})

//handling loading more pokemons on the page
handleLoadMore=()=>{
            const pageLimit = this.state.pageLimit + 12
            this.LoadData(pageLimit)  // calling api to fetch the new chunck of data
            this.setState({pageLimit})
    }
// handling the current pokemon type/categery
handlePokeType=(type)=>{
    this.setState({currentType: type})
    //reset the data to begin from the first page
    const data = this.state.data.filter(poke=> this.state.data.indexOf(poke) < 12)  
    this.setState({data})
}
 
// filtering the data as per the current pokemon type
pokemonsFilter(pokemons){
        if(this.state.currentType !== "All"){
           pokemons= this.state.data.filter(poke=> poke.data.types.find(
                          type=>type.type.name===this.state.currentType))                         
                          return pokemons}
            return pokemons= this.state.data}

    render(){
                //if data not loaded will retaurn "loading sign"
        if(!this.state.isloaded)return<p className="m-3">Loading...</p>  
        let pokemons = this.pokemonsFilter(this.state.data)
        const {pokemonTypes,currentType, currentPokemon, pageLimit} = this.state
        return(
            <React-Fragment>
                <Header pokemonTypes={pokemonTypes} 
                        currentType={currentType}
                        onClick={this.handlePokeType}/>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            {pokemons.map(pokemon=>
                                <SinglePokemon key={pokemon.data.id} 
                                                types={pokemon.data.types} 
                                                name={pokemon.data.name}
                                                image={pokemon.data.sprites.front_default}
                                                pokemonId={pokemon.data.id}
                                                pokemons={pokemons}
                                                onClick={this.handleClick}
                                                currentPokemon={currentPokemon} />)}
                        </div>
                    </div>
                    <LoadMore onClick={this.handleLoadMore} pageLimit={pageLimit}/>
                </div>
            </React-Fragment>
        )
    }
}

export default Pokemons;