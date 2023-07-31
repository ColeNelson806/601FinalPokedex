import { useState, useEffect } from "react";

function PokemonGeneration({P, speciesUrl}, setErrorMessage) {
  const [pokemonGenerationRomanOnly, setPokemonGenerationRomanOnly] = useState(null); 

  useEffect(() => {
    P.resource(speciesUrl).then((pokemonSpeciesObj) => {
      const romanOnly = pokemonSpeciesObj.generation.name.split("-");
      setPokemonGenerationRomanOnly(romanOnly[1]);
    })
    .catch((err) => {
      setErrorMessage(err);
    })
  }, []);

  return (
    <div className="generationDetails">
        Generation: {pokemonGenerationRomanOnly}
    </div>
  )
}
export { PokemonGeneration }