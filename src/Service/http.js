import axios from "axios"

axios.interceptors.response.use(null, error=>{
    const expectedErrors = error.data.response.status >= 400 && error.data.response.status < 500
    if(expectedErrors)alert("Something went wrong!!!")
     return Promise.reject(error)
})

export function getPokemonsList(){
    return axios.get(`${process.env.REACT_APP_URL}pokemon/?limit=12`)
}

export function getSinglePokemon(id){
    return axios.get(`${process.env.REACT_APP_URL}${id}`)
}

export function getPokemonTypes(){
    return axios.get(`${process.env.REACT_APP_URL}type/?limit=999`)
}

export function gettingUrl(url){
    return axios.get(url)
}