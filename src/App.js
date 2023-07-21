import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

function App() {
  const [backState, setBackState] = useState(0);

  const [listOfDex, setListOfDex] = useState(null); // array of all the dex options
  const [showPokedexList, setShowPokedexList] = useState(false); // controls if dex list is displayed or not
  const [selectedPokedex, setSelectedPokedex] = useState(null); // the dex that user selected/clicked on
  const [selectedPokedexUrl, setSelectedPokedexUrl] = useState(null); // url of selected dex
  
  const [needPokemonListUpdate, setNeedPokemonListUpdate] = useState(null);
  const [listOfPokemon, setListOfPokemon] = useState(null); // array of all the pokemons in the selected dex
  const [showPokemonList, setShowPokemonList] = useState(false); // controls if pokemon list is displayed or not
  const [selectedPokemon, setSelectedPokemon] = useState(null); // the pokemon the user selected/clicked on
  
  const [needPokemonDetailsListUpdate, setNeedPokemonDetailsListUpdate] = useState(null);
  const [listOfPokemonDetails, setListOfPokemonDetails] = useState(null); // array of all the details of selected pokemon
  const [showPokemonDetailsList, setShowPokemonDetailsList] = useState(false); // controls if pokemon details are displayed or not

  


  useEffect(() => {
    FetchAPI().then((value) => {setListOfDex(value); updatePokedexList()});
  }, []);



  const updatePokedexList = () => {
    setShowPokedexList(true);
  };
  const updateSelectedPokedex = (selected, selectedUrl) => {
    setShowPokedexList(false);
    setSelectedPokedex(selected);
    setSelectedPokedexUrl(selectedUrl);
    setNeedPokemonListUpdate(true);
    setBackState(1);
  };



  const updatePokemonList = () => {
    P.resource(selectedPokedexUrl).then((value) => {
      setListOfPokemon(value.pokemon_entries);
      setShowPokemonList(true);
      setNeedPokemonListUpdate(false);
    });
  };
  
  const updateSelectedPokemon = (selected) => {
    setShowPokemonList(false);
    setSelectedPokemon(selected);
    setNeedPokemonDetailsListUpdate(true);
    setBackState(2);
  };
  if (needPokemonListUpdate === true) updatePokemonList();



  const updatePokemonDetailsList = () => {
      P.getPokemonByName(selectedPokemon).then((pokemonSpecific) => {
        setListOfPokemonDetails(pokemonSpecific);
        setShowPokemonDetailsList(true);
        setNeedPokemonDetailsListUpdate(false);
      }); 
  };

      
  if (needPokemonDetailsListUpdate === true) updatePokemonDetailsList();

  

  return (
    <div className="App"> 
      <h2 className="titlePokedex">{selectedPokedex ? `Selected Pokedex: ${selectedPokedex}` : "Select a Pokedex"}</h2>
      <div className="outerDiv">
        <div className="innerDiv">
          <div className="displayDiv">
            <div>
              <button onClick={ () => {
                HomeButton(setBackState, setShowPokedexList, setSelectedPokedex, setSelectedPokedexUrl, setNeedPokemonListUpdate, setListOfPokemon, setShowPokemonList, 
                  setSelectedPokemon, setNeedPokemonDetailsListUpdate, setListOfPokemonDetails, setShowPokemonDetailsList)
              }}>Home</button>

              <button onClick={ () => {
                BackButton(backState, setBackState, setShowPokedexList, setSelectedPokedex, setSelectedPokedexUrl, setNeedPokemonListUpdate, setListOfPokemon, setShowPokemonList, 
                  setSelectedPokemon, setNeedPokemonDetailsListUpdate, setListOfPokemonDetails, setShowPokemonDetailsList)
              }}>Back</button>
            </div>
            <br/>       
            {showPokedexList ? PokedexList(listOfDex, updateSelectedPokedex) : null}
            {showPokemonList ? PokemonList(listOfPokemon, updateSelectedPokemon) : null}
            {showPokemonDetailsList ? PokemonDetails(listOfPokemonDetails) : null}


          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function FetchAPI() {
  const createDexList = async () => {
    const dexPromise = await P.getPokedexsList();
    return dexPromise.results;
  }
  return createDexList();
};
export { FetchAPI }; 

function BackButton(backState, setBackState, setShowPokedexList, setSelectedPokedex, setSelectedPokedexUrl, setNeedPokemonListUpdate, setListOfPokemon, setShowPokemonList, 
  setSelectedPokemon, setNeedPokemonDetailsListUpdate, setListOfPokemonDetails, setShowPokemonDetailsList) {
  //backState === 1 ? setShowPokedexList(true) : backState === 2 ?  : null; 
  if (backState === 0) {
    alert("You can not go back any more.")
  }

  if (backState === 1) {
    setBackState(0); setShowPokedexList(true); setSelectedPokedex(null); setSelectedPokedexUrl(null); setNeedPokemonListUpdate(null); 
      setListOfPokemon(null); setShowPokemonList(false); 
  }
  if (backState === 2) {
    setBackState(1); setShowPokemonList(true); setSelectedPokemon(null); setNeedPokemonDetailsListUpdate(null); 
      setListOfPokemonDetails(null); setShowPokemonDetailsList(false);
  }
};

function HomeButton(setBackState, setShowPokedexList, setSelectedPokedex, setSelectedPokedexUrl, setNeedPokemonListUpdate, setListOfPokemon, setShowPokemonList, 
  setSelectedPokemon, setNeedPokemonDetailsListUpdate, setListOfPokemonDetails, setShowPokemonDetailsList) {
    setBackState(0); setShowPokedexList(true); setSelectedPokedex(null); setSelectedPokedexUrl(null); setNeedPokemonListUpdate(null); setListOfPokemon(null); 
      setShowPokemonList(false); setSelectedPokemon(null); setNeedPokemonDetailsListUpdate(null); setListOfPokemonDetails(null); setShowPokemonDetailsList(false);
  }

function PokedexList(listOfDex, updateSelectedPokedex) {
  return (
    listOfDex.map((currDex, index) => {
    return <button key={ index } onClick={() => {
      updateSelectedPokedex(currDex.name, currDex.url)
    }}>{currDex.name}</button>
    })
  )
};
export { PokedexList };



function PokemonList(listOfPokemon, updateSelectedPokemon) {
  console.log(listOfPokemon);

  return (
    listOfPokemon.map((currPokemon) => {
    return <button key={currPokemon.entry_number} onClick={() => {
      updateSelectedPokemon(currPokemon.pokemon_species.name, currPokemon.pokemon_species.url)
    }}>{currPokemon.pokemon_species.name}</button>
    })
  )
};
export { PokemonList };



function PokemonDetails(listOfPokemonDetails) {
  return (
    <>
      <PokemonSprite sprites={listOfPokemonDetails.sprites} selectedPokemon={listOfPokemonDetails.name}/>
      <NameDetails nameObj={listOfPokemonDetails.name} pokemonId={listOfPokemonDetails.id}/>
      <TypeDetails typesObj={listOfPokemonDetails.types}/>
      <StatDetails statsObj={listOfPokemonDetails.stats}/>
      <AbilityDetails abilitiesObj={listOfPokemonDetails.abilities}/>
    </>
  )
};
export { PokemonDetails };



function PokemonSprite({sprites, selectedPokemon}) {
  return <img src={sprites.front_default} alt={selectedPokemon.charAt(0).toUpperCase() + selectedPokemon.slice(1) + "'s sprite image"}/>
}
export { PokemonSprite }



function NameDetails({nameObj, pokemonId}) {
  return (
    <div>
      {
        pokemonId.toString().length === 3 ? 
        "#" + pokemonId : pokemonId.toString().length === 2 ? "#0" + pokemonId : "#00" + pokemonId
      }

      { " " + nameObj.charAt(0).toUpperCase() + nameObj.slice(1)}</div>
  )
}
export { NameDetails }



function TypeDetails({typesObj}) {
  return (
    <div>
      Types:{typesObj.map((currTypeSlot, index) => { 
        return (typesObj.length - index === 1) ?
          " " + (currTypeSlot.type.name).charAt(0).toUpperCase() + currTypeSlot.type.name.slice(1) :
          " " + (currTypeSlot.type.name).charAt(0).toUpperCase() + currTypeSlot.type.name.slice(1) + "  -- ";
       })}
    </div>
    
  )
}
export { TypeDetails }



function StatDetails({statsObj}) {
  return (
    statsObj.map((currStat, index) => {
      return (
        <div key={ index }>
          {(currStat.stat.name.charAt(0).toUpperCase() + currStat.stat.name.slice(1)) + ": " + currStat.base_stat}
        </div>
      )
    })
  )
}
export { StatDetails }



function AbilityDetails({abilitiesObj}) {
  return (
    <div>
      Abilities:{abilitiesObj.map((currAbilitySlot, index) => {
        return (abilitiesObj.length - index === 1) ?  
        " " + currAbilitySlot.ability.name.charAt(0).toUpperCase() + currAbilitySlot.ability.name.slice(1) :
        " " + currAbilitySlot.ability.name.charAt(0).toUpperCase() + currAbilitySlot.ability.name.slice(1) + "  -- ";
      })}
    </div>
  )
}
export { AbilityDetails }