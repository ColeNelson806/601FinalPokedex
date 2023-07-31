import { NameDetails } from "./NameSpriteGeneration/NameDetails";
import { PokemonSprite } from "./NameSpriteGeneration/PokemonSprite";
import { PokemonGeneration } from "./NameSpriteGeneration/PokemonGeneration";

import { EvolutionChain } from "./PokemonEvoInfo/EvolutionChain";
import { TypeDetails } from "./PokemonEvoInfo/TypeAbilityWeightStat/TypeDetails";
import { AbilityDetails } from "./PokemonEvoInfo/TypeAbilityWeightStat/AbilityDetails";
import { WeightDetails } from "./PokemonEvoInfo/TypeAbilityWeightStat/WeightDetails";

import { StatDetails } from "./StatDetails";

function PokemonDetails(P, listOfPokemonDetails, selectedPokemonEvoChainCustObj, setErrorMessage) {
  return (
    <div className="pokemonDetailsDiv">
      <div className="pokemonDetailsEvos">
        <div className="pokemonSpriteNameGeneration">
          <PokemonGeneration P={P} speciesUrl={listOfPokemonDetails.species.url} setErrorMessage={setErrorMessage}/>
          <PokemonSprite sprites={listOfPokemonDetails.sprites} selectedPokemon={listOfPokemonDetails.name}/>
          <NameDetails nameObj={listOfPokemonDetails.name} pokemonId={listOfPokemonDetails.id}/>
          
        </div>
        <div className="pokemonEvoFlexBox">
          <div className="pokemonEvoInfo">
            <EvolutionChain evoChainObj={selectedPokemonEvoChainCustObj}/>
            <div className="typesAbilitiesWeightStats">
              <TypeDetails typesObj={listOfPokemonDetails.types}/>
              <AbilityDetails abilitiesObj={listOfPokemonDetails.abilities}/>
              <WeightDetails weightObj={listOfPokemonDetails.weight}/>
            </div>
          </div>
        </div>
      </div>
      <div className="pokemonStatDetails">
        <StatDetails statsObj={listOfPokemonDetails.stats}/>
      </div>
    </div>
  )
};
export { PokemonDetails };