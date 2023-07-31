function PokemonSprite({sprites, selectedPokemon}) {
  return (
    <div className="selectedPokemonSpriteDiv">
      <img className="selectedPokemonSprite" 
        src={sprites.front_default} 
        alt={selectedPokemon.charAt(0).toUpperCase() + selectedPokemon.slice(1) + "'s sprite image"}/>
    </div>
  )
}
export { PokemonSprite }