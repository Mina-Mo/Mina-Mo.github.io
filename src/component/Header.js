import React from "react"
import Filter from "../common/Filter";

function Header(props){
  const {currentType, pokemonTypes, onClick} = props
    return(
      <div className="bg-dark mb-5">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <h2 className="text-white">Pokemon</h2>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <form className="form-inline mt-2 mt-md-0 col offset-8">
            <Filter pokemonTypes={pokemonTypes} currentType={currentType} onClick={onClick}/>
          </form>
        </div>
      </nav>
      </div>
   
    )
}

export default Header