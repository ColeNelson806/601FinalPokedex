function NameDetails({nameObj, pokemonId}) {
  return (
    <div className="nameDetails">
      {
        pokemonId.toString().length === 4 ? 
        "#" + pokemonId : 
        pokemonId.toString().length === 3 ? 
          "#0" + pokemonId : 
          pokemonId.toString().length === 2 ? 
            "#00" + pokemonId : 
            "#000" + pokemonId
      }

      { " " + nameObj.charAt(0).toUpperCase() + nameObj.slice(1)}</div>
  )
}
export { NameDetails }