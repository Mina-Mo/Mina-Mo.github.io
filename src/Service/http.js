import axios from "axios"

axios.interceptors.response.use(null, error=>{
    const expectedErrors = error.data.response.status >= 400 && error.data.response.status < 500
    if(expectedErrors)alert("Something went wrong!!!")
     return Promise.reject(error)
})

export function getPokemonsList(limit){
    return axios.get(`${process.env.REACT_APP_URL}?limit=${limit}`)
}

export function getSinglePokemon(id){
    return axios.get(`${process.env.REACT_APP_URL}${id}`)
}
