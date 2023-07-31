function PokedexList(listOfDex, updateSelectedPokedex) {
  return (
    <div className="listPokedexBar">
      <label htmlFor="pokedexNamesChoice" className="menuInfo">{"Select a Pokédex"}</label>
      <div className="listOfPokedex">
        <input list="pokedexNames" name="pokedexNamesChoice" id="pokedexNamesChoice" placeholder="Double-click for options" data-testid="pokedexListId"/>
        <datalist id="pokedexNames">
          {listOfDex.map((currDex, index) => {
            return (
              <option key={index} className="pokedexDatalistOptions" value={currDex.name}>{currDex.name.charAt(0).toUpperCase() + currDex.name.slice(1)}</option>
            )
          })}  
        </datalist>
        <button className="viewButton" onClick={() => {
          if (document.getElementById("pokedexNamesChoice").value) { // If the input has a value
            Object.values(document.getElementsByClassName("pokedexDatalistOptions")).forEach((pokedexName) => { // check against datalist
              if (document.getElementById("pokedexNamesChoice").value.toLowerCase() === pokedexName.value) { // if it has a match
                updateSelectedPokedex(document.getElementById("pokedexNamesChoice").value.toLowerCase()); // update state
                
              }
            })
          }
        }}>View</button>
      </div>
    </div>
  )
};
export { PokedexList };