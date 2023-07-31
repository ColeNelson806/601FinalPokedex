import { useState, useEffect } from 'react';
import './App.css';
import { FetchAPI } from "./FetchAPI";
import { PokedexList } from "./components/PokedexList";
import { PokemonList } from "./components/PokemonList";
import { PokemonDetails } from "./components/PokemonDetails";

import { HomeButton } from "./components/NavButtons/HomeButton";
import { BackButton } from "./components/NavButtons/BackButton";

const Pokedex = require("pokeapi-js-wrapper")

function App() {
  // states
  const P = new Pokedex.Pokedex({cacheImages: true});

  const [backState, setBackState] = useState(0);

  const [listOfDex, setListOfDex] = useState(null); // array of all the dex options
  const [showPokedexList, setShowPokedexList] = useState(false); // controls if dex list is displayed or not
  const [selectedPokedex, setSelectedPokedex] = useState(null); // the dex that user selected/clicked on
  
  const [needPokemonListUpdate, setNeedPokemonListUpdate] = useState(false);
  const [listOfPokemon, setListOfPokemon] = useState(null); // array of all the pokemons in the selected dex
  const [showPokemonList, setShowPokemonList] = useState(false); // controls if pokemon list is displayed or not
  const [selectedPokemon, setSelectedPokemon] = useState(null); // the pokemon the user selected/clicked on
  
  const [needPokemonChainEvolutionUpdate, setNeedPokemonChainEvolutionUpdate] = useState(false);
  const [needPokemonChainUrlUpdate, setNeedPokemonChainUrlUpdate] = useState(false)
  const [selectedPokemonEvoChainUrl, setSelectedPokemonEvoChainUrl] = useState(null);
  const [selectedPokemonEvoChainCustObj, setSelectedPokemonEvoChainCustObj] = useState(null);

  const [needPokemonDetailsListUpdate, setNeedPokemonDetailsListUpdate] = useState(false);
  const [listOfPokemonDetails, setListOfPokemonDetails] = useState(null); // array of all the details of selected pokemon
  const [showPokemonDetailsList, setShowPokemonDetailsList] = useState(false); // controls if pokemon details are displayed or not

  const [errorMessage, setErrorMessage] = useState(null); 

  useEffect(() => {
    FetchAPI(P, setErrorMessage).then((value) => {setListOfDex(value); updatePokedexList()});
  }, []);

  const updatePokedexList = () => {
    setShowPokedexList(true);
  };
  const updateSelectedPokedex = (selected) => {
    setShowPokedexList(false);
    setSelectedPokedex(selected);
    setNeedPokemonListUpdate(true);
    setBackState(1);
  };



  const updatePokemonList = () => {
    P.getPokedexByName(selectedPokedex).then((value) => {
      setListOfPokemon(value.pokemon_entries);
      setShowPokemonList(true); 
      setNeedPokemonListUpdate(false);
    })
    .catch((err) => {
      setErrorMessage(err);
    });
  };
  const updateSelectedPokemon = (selectedPokemonName) => {
    setShowPokemonList(false);
    setSelectedPokemon(selectedPokemonName);
    setNeedPokemonChainEvolutionUpdate(true);
    setBackState(2);
  };
  if (needPokemonListUpdate === true) updatePokemonList(); 



  const obtainPokemonUrlObj = () => {
    P.getPokemonSpeciesByName(selectedPokemon).then((obj) => {
      if (obj !== "Stop") {
        setSelectedPokemonEvoChainUrl(obj.evolution_chain.url);
        setNeedPokemonChainEvolutionUpdate(false)
        setNeedPokemonChainUrlUpdate(true);
      } else {
        setNeedPokemonDetailsListUpdate(true);
      }
    })
    .catch((err) => {
      setErrorMessage(err);
    });
  }


  const obtainPokemonChainUrlObj = () => {
    const customChainDataObj = [];
    P.resource(selectedPokemonEvoChainUrl).then((evoChainObj) => {
      if (evoChainObj.chain.evolves_to[0] === undefined) {
        P.getPokemonByName(evoChainObj.chain.species.name).then((stage1) => { 
          customChainDataObj.push({stageName: stage1.name, stageSpriteUrl: stage1.sprites.front_default});
          setSelectedPokemonEvoChainCustObj(customChainDataObj);
          setNeedPokemonChainUrlUpdate(false);
          setNeedPokemonDetailsListUpdate(true);
        });

      } else if (evoChainObj.chain.evolves_to[0].evolves_to[0] === undefined) {
        P.getPokemonByName(evoChainObj.chain.species.name).then((stage1) => {
          customChainDataObj.push({stageName: stage1.name, stageSpriteUrl: stage1.sprites.front_default});
          evoChainObj.chain.evolves_to.forEach((currStage2ArrayObjs, stage2Index) => {
            P.getPokemonByName(currStage2ArrayObjs.species.name).then((stage2) => {    
              customChainDataObj.push({stageName: stage2.name, stageSpriteUrl: stage2.sprites.front_default});
              if (evoChainObj.chain.evolves_to.length === stage2Index + 1) {
                setSelectedPokemonEvoChainCustObj(customChainDataObj);
                setNeedPokemonChainUrlUpdate(false);
                setNeedPokemonDetailsListUpdate(true);
              };
            });
          });
        });


      } else {
        P.getPokemonByName(evoChainObj.chain.species.name).then((stage1) => {
          customChainDataObj.push({stageName: stage1.name, stageSpriteUrl: stage1.sprites.front_default});
          evoChainObj.chain.evolves_to.forEach((currStage2ArrayObjs, stage2Index) => {
            P.getPokemonByName(currStage2ArrayObjs.species.name).then((stage2) => {
              customChainDataObj.push({stageName: stage2.name, stageSpriteUrl: stage2.sprites.front_default});
              currStage2ArrayObjs.evolves_to.forEach((currStage3ArrayObjs, stage3Index) => {
                P.getPokemonByName(currStage3ArrayObjs.species.name).then((stage3) => {
                  customChainDataObj.push({stageName: stage3.name, stageSpriteUrl: stage3.sprites.front_default});
                  if ((evoChainObj.chain.evolves_to.length === stage2Index + 1) && (currStage2ArrayObjs.evolves_to.length === stage3Index + 1)) {
                    setSelectedPokemonEvoChainCustObj(customChainDataObj);
                    setNeedPokemonChainUrlUpdate(false);
                    setNeedPokemonDetailsListUpdate(true);
                  };
                });
              });
            });
          });
        });
      };
    })
    .catch((err) => {
      setErrorMessage(err);
    });
  };



  const updatePokemonDetailsList = () => {
      P.getPokemonByName(selectedPokemon).then((pokemonSpecific) => {
        setListOfPokemonDetails(pokemonSpecific);
        setNeedPokemonDetailsListUpdate(false);
        setShowPokemonDetailsList(true);
        
      })
      .catch((err) => {
        setErrorMessage(err);
      }); 
  };
  if (needPokemonChainEvolutionUpdate === true) obtainPokemonUrlObj();
  if (needPokemonChainUrlUpdate === true) obtainPokemonChainUrlObj(); 
  if (needPokemonDetailsListUpdate === true) updatePokemonDetailsList();


  // Callback function that the home button utilizes
  const homeButtonReset = () => {
    setBackState(0); 
    setShowPokedexList(true); 
    setSelectedPokedex(null); 
    setNeedPokemonListUpdate(false); 
    setListOfPokemon(null); 
    setSelectedPokemon(null);
    setShowPokemonList(false); 
    setSelectedPokemonEvoChainUrl(null);
    setSelectedPokemonEvoChainCustObj(null);
    setNeedPokemonChainUrlUpdate(false);
    setNeedPokemonChainEvolutionUpdate(false);
    setNeedPokemonDetailsListUpdate(false); 
    setListOfPokemonDetails(null); 
    setShowPokemonDetailsList(false);
  }

  // Callback function that the back button utilizes
  const backButtonReset = () => { 
    if (backState === 0) {
      alert("You can not go back any more.")
    }
  
    if (backState === 1) {
      setBackState(0); setShowPokedexList(true); setSelectedPokedex(null); setNeedPokemonListUpdate(false); 
        setListOfPokemon(null); setShowPokemonList(false); 
    }
    if (backState === 2) {
      setBackState(1); setShowPokemonList(true); setSelectedPokemon(null); setNeedPokemonDetailsListUpdate(false); 
        setListOfPokemonDetails(null); setShowPokemonDetailsList(false); setSelectedPokemonEvoChainUrl(null);
        setSelectedPokemonEvoChainCustObj(null); setNeedPokemonChainUrlUpdate(false); setNeedPokemonChainEvolutionUpdate(false);
    }
  }



  return (
    <div className="App"> 
      <div className="displayDiv">
        <div className="topBar">
          <div className="pokedexTitle">
            {selectedPokedex === null ? "IS 601 Pokédex" : 
            "Selected Pokédex: " + selectedPokedex.charAt(0).toUpperCase() + selectedPokedex.slice(1)}
          </div>
          <div className="homeBackButtons">
            <button className="backButton" onClick={ () => {
              BackButton(backButtonReset)
            }}>Back</button>

            <button className="homeButton" onClick={ () => {
              HomeButton(homeButtonReset)
            }}>Home</button>
          </div>   
        </div>
        <div className="renderedBodyDiv">
          <div className="renderedBody">
            {errorMessage ? ErrorAlert(setErrorMessage, errorMessage) :
              <>
                {showPokedexList ? PokedexList(listOfDex, updateSelectedPokedex) : null}
                {showPokemonList ? PokemonList(listOfPokemon, updateSelectedPokemon) : null} 
                {showPokemonDetailsList ? PokemonDetails(P, listOfPokemonDetails, selectedPokemonEvoChainCustObj, setErrorMessage) : null}
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function ErrorAlert(setErrorMessage, errorMessage) {
  setErrorMessage(null);
  alert("An error has occured, please try again later. \n Error Message: " + errorMessage);
  
}
export { ErrorAlert }

