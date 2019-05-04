
export function pokemonList(pageLimt){
    const list =[]
        for(let i= pageLimt; i<pageLimt+12; i++){
            list.push(i)
        }
        return list;
    }
