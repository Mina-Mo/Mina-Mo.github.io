// main pokemon component

import React, {Component} from "react"
import {getPokemonsList, gettingUrl, getPokemonTypes} from "../Service/http"
import SinglePokemon from "../common/SinglePokemon"
import LoadMore from "../common/LoadMore";
import Header from "./Header";


class Pokemons extends Component{
   state={
        data:[],   //getting all pokemons in array of objects
        next:"",  // the url of next page
        isloaded: false,  // checking if the component is loaded
        currentPokemon:"",  // current pokemon ID
        pokemonsLength: 0,   // pokemons length of current type
        //pokemon types/categeries
        pokemonTypes:["All"],
        currentType: "All", // current pokemon type
        currentPokemons:[],  //  pokemons of the current type 
        theEndOfList:false  // the end of pokemons list
}

// calling loadData method to fetch the data
componentDidMount(){
    this.LoadData()  // call loadData method to get the first page of data
    this.LoadTypes()  // call loadTypes method to get an array of all types
}


 LoadData=async()=>{ // getting array of objects for pokemons 
    try{
        this.setState({data:[]})  // reset the data
        this.setState({pokemonsLength:0})  // reset the pokemons length of current type
        const pokemonList = await getPokemonsList()  // getting a list of names and next page urls
        this.setState({next: pokemonList.data.next})  // set the next url
         pokemonList.data.results.map(async e=>{       // looping in the list 
             const pokemon = await gettingUrl(e.url)  // fetching url of each name to get every single pokemon data
             this.setState({data: [...this.state.data, pokemon]})   // pushing the new pokemon to the data
            })            
             //adding to the state what we got from server
            this.setState({isloaded: true})  

    }catch(error){  // handling error
        if(error.response.status >=400 && error.response.status < 500){
            alert(error.response.data)
        }else{
            alert("Something went wrong.")
        }
     }
}
 
// for getting an array of all possible types
 LoadTypes= async()=>{
     try{
        const pokemonTypes = await getPokemonTypes()  // fetching the Api 
        pokemonTypes.data.results.map(type=>  // looping in result to get the name of each type and push it to the array
            this.setState({pokemonTypes: [...this.state.pokemonTypes, type.name]})
        )
     }catch(error){   // handling error
        if(error.response.status >=400 && error.response.status < 500){
            alert(error.response.data)
        }else{
            alert("Something went wrong.")
        }
     }
 }
// method to load one more page of data
 async LoadingOneMoreChunk(){
    try{
        const pokemonList = await gettingUrl(this.state.next)  // fetching the next API link
        this.setState({next: pokemonList.data.next}) // reset the next link by the new one 
         pokemonList.data.results.map(async e=>{     // looping in the list 
             const pokemon = await gettingUrl(e.url)  // fetching url of each name to get every single pokemon data
             if(!pokemon)return this.setState({theEndOfList:true})  // checking if the end of data list
             this.setState({data: [...this.state.data, pokemon]})   // pushing the new pokemon to the data
            }) 
            // filtering the data to get a the pokemons of the current type
            const currentPokemons = this.state.data.filter(poke=> poke.data.types.find(
                type=>type.type.name===this.state.currentType))
                this.setState({currentPokemons})  // reset the current type data
                this.setState({pokemonsLength : currentPokemons.length})  // reset the current type length
                        
             //adding to the state what we got from server
            this.setState({isloaded: true})

    }catch(error){  // handling error
        if(error.response.status >=400 && error.response.status < 500){
            alert(error.response.data)
        }else{
            alert("Something went wrong.")
        }
    }
}

// handling current pokemin
handleClick=(pokeId)=>this.setState({currentPokemon: pokeId})

//handling the load more button
handleLoadMore=async()=>{
    await this.LoadingOneMoreChunk()  // calling LoadingOneMoreChunk method to load the next page
    const {currentType, pokemonsLength} = this.state  

    // checking the current type and if the length type <= the current pokemon length +12 
    //as it should load the second page each page 12
    if(currentType !== "All" && pokemonsLength <= pokemonsLength+12){  

        // calling the LoadingOneMoreChunk method in loop to get the rest of the required data 
        for(let i = pokemonsLength; pokemonsLength <= pokemonsLength+12; i++){
           await this.LoadingOneMoreChunk()

           // break the loop if u reach to the required amount of data
            if(this.state.pokemonsLength >= pokemonsLength+12)break;
        } 
    }
 }


// handling the current pokemon type/select type
handlePokeType=async(type)=>{
    // resting the data by calling loadData method
    this.LoadData()
    await this.setState({currentType: type})  // set the current selected type
    if(type!== "All"){  // if not All, filter the data to get the current pokemons type
        let pokemons= this.state.data.filter(poke=> poke.data.types.find(
            type=>type.type.name===this.state.currentType))

                // calling the LoadingOneMoreChunk method in loop to get the rest of the required pokemons each page 
                for(let i = pokemons.length; pokemons.length <= 12; i++){
                   await this.LoadingOneMoreChunk()
                   // reset the current pokemons by the new ones
                  const newpokemons = this.state.data.filter(poke=> poke.data.types.find(
                    type=>type.type.name===this.state.currentType))
                    this.setState({currentPokemons:newpokemons})

                    // checking if the the new chunck of data reach till 12 
                    if(newpokemons.length>=12)break;
                } 
            }
        return null    
    }
    
// filtering the data as per the current pokemon type
pokemonsFilter=(currentType)=>{
    let pokemons;
        if(currentType!== "All"){
              pokemons= this.state.data.filter(poke=> poke.data.types.find(
                          type=>type.type.name===currentType))
                          return pokemons
                        }
          return pokemons =this.state.data
}

    render(){
                //if data not loaded will retaurn "loading sign"
         if(!this.state.isloaded)return<p className="m-3">Loading...</p>  
        const pokemons = this.pokemonsFilter(this.state.currentType)
        const {pokemonTypes,currentType, currentPokemon, pageLimit, theEndOfList} = this.state
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
                    <LoadMore onClick={this.handleLoadMore} pageLimit={pageLimit} theEndOfList={theEndOfList}/>
                </div>
            </React-Fragment>
        )
    }
}

export default Pokemons;