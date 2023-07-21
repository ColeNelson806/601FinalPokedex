import { render, screen } from '@testing-library/react';
import App from './App';

  // const pokemonsObj = [ 
  //   { entry_number: 1, pokemon_species: { name: "pikipek", url: "https://pokeapi.co/api/v2/pokemon-species/731/" } },
  //   { entry_number: 2, pokemon_species: { name: "inkay", url: "https://pokeapi.co/api/v2/pokemon-species/686/" } },
  //   { entry_number: 3, pokemon_species: { name: "toucannon", url: "https://pokeapi.co/api/v2/pokemon-species/733/" } },
  //   { entry_number: 4, pokemon_species: { name: "yungoos", url: "https://pokeapi.co/api/v2/pokemon-species/734/" } },
  //   { entry_number: 5, pokemon_species: { name: "gumshoos", url: "https://pokeapi.co/api/v2/pokemon-species/735/" } },
  //   { entry_number: 6, pokemon_species: { name: "rattata", url: "https://pokeapi.co/api/v2/pokemon-species/19/" } },
  //   { entry_number: 7, pokemon_species: { name: "raticate", url: "https://pokeapi.co/api/v2/pokemon-species/20/" } },
  //   { entry_number: 8, pokemon_species: { name: "buneary", url: "https://pokeapi.co/api/v2/pokemon-species/427/" } },
  //   { entry_number: 9, pokemon_species: { name: "lopunny", url: "https://pokeapi.co/api/v2/pokemon-species/428/" } },
  //   { entry_number: 10, pokemon_species: { name: "inkay", url: "https://pokeapi.co/api/v2/pokemon-species/686/" } }
  // ]

describe("App", () => {
  describe("Requirement 1", () => {
    test("Render list of Pokedexes when application is loaded the first time", () => {
      // When the app is rendered intially
      //render(<App />)
      
      // Then
      //Renders list of pokedexes returned from the API
    });
  });

  describe("Requirement 2", () => {
    describe("API throws error when rendering list of Pokedexs", () => {
      test("User is shown an error message", () => {
      // Given user attempting to select a Pokedex
      // When an error occurs from the API
      // Then they are presented an error message
      // And the list of Pokedexes does not render
      });

      test("List of pokedexes does not render", () => {

      });
    });
  });

  describe("Requirement 3", () => {
    test("When a View button is clicked the associated Pokedex is stored", () => {
      
    });
  });

  describe("Requirement 4", () => {
    test("When a View button is clicked, the associated Pokedex's Pokemon is rendered", () => {
      
    });
  });

  describe("Requirement 5", () => {
    describe("API throws error when selecting Pokemon", () => {
      test("User is shown error message", () => {
        
      });

      test("Pokemon list does not render", () => {

      });
    });
  });

  describe("Requirement 6", () => {
    test("When a View Details button is clicked the associated Pokemon is stored", () => {
      //
    });
  });

  describe("Requirement 7", () => {
    test("When a View Details button is clicked the associated Pokemon's details is rendered", () => {
      //
    });
  });

  describe("Requirement 8", () => {
    describe("API throws error when rendering selected Pokemon's details", () => {
      test("User is shown error message", () => {
        
      });

      test("Pokemon's details does not render", () => {
        
      });
    });
  });

  describe("Requirement 9", () => {
    test("User is returned to first screen when Home button is clicked", () => {
      //
    });
  });

  describe("Requirement 10", () => {
    test("User is moved back one screen when Back button is clicked", () => {
      //
    });
  });
});