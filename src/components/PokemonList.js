function PokemonList(listOfPokemon, updateSelectedPokemon) { 
  return (
    <div className="listPokemonBar">
      <label htmlFor="pokemonNames" className="menuInfo">Select a Pokémon</label>
      <div className="listOfPokemon">
        <input list="pokemonNames" name="pokemonNamesChoice" id="pokemonNamesChoice" placeholder="Double-click for options"/>
        <datalist id="pokemonNames">
          {listOfPokemon.map((currPokemon, index) => {
            return (
              <option key={index} className="pokemonDatalistOptions" value={currPokemon.pokemon_species.name}>{
                currPokemon.pokemon_species.name.charAt(0).toUpperCase() + currPokemon.pokemon_species.name.slice(1)
              }</option>
            )
          })}  
        </datalist>
        <button className="viewDetailsButton" onClick={() => {
          if (document.getElementById("pokemonNamesChoice").value) { // If the input has a value
            Object.values(document.getElementsByClassName("pokemonDatalistOptions")).forEach((pokedexName) => { // check against datalist
              if (document.getElementById("pokemonNamesChoice").value.toLowerCase() === pokedexName.value) { // if it has a match
                updateSelectedPokemon(document.getElementById("pokemonNamesChoice").value.toLowerCase()); // update state
                
              }
            })
          }
        }}>View Details</button>
      </div>
    </div>
  )
};
export { PokemonList };