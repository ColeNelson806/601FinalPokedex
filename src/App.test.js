import { fireEvent, render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import App from './App';
import { Pokedex } from "pokeapi-js-wrapper"; 
jest.mock("pokeapi-js-wrapper");

describe("App", () => {
  beforeEach(() => {
    Pokedex.mockReturnValue({
      getPokedexsList: jest.fn().mockResolvedValue(
        { results: [{ name: "national" }]}
      ),
  
      getPokedexByName: jest.fn().mockResolvedValue(
        { pokemon_entries: [{pokemon_species : { name: "eevee" }}]}
      ),

      getPokemonSpeciesByName: jest.fn().mockResolvedValue(
        "Stop"
      ),

      resource: jest.fn().mockResolvedValue(
        { generation : { name : "generation-i" } }
      ),

      getPokemonByName: jest.fn().mockResolvedValue(
        {
          abilities : [{ability : {name : "run-away"}}],
          id : 133,
          name : "eevee",
          order : 215,
          species : { name : "eevee", url : null},
          sprites : {front_default: null},
          stats : [
            {base_stat : 55, stat : {name : "hp"}},
            {base_stat : 55, stat : {name : "attack"}},
            {base_stat : 50, stat : {name : "defense"}},
            {base_stat : 45, stat : {name : "special-attack"}},
            {base_stat : 65, stat : {name : "special-defense"}},
            {base_stat : 55, stat : {name : "speed"}},
          ],
          types : [ {type : {name : "normal"} } ],
          weight : 65,
        }
      ),
  
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Requirement 1", () => {
    test("Render list of Pokedexes when application is loaded the first time", async () => {
      let foundOptionValue;
      // When the app is rendered intially 
      render(<App />)
      //Then ~ has list of pokedexes returned from the API
      await screen.findAllByRole("option", {hidden: true}).then((value) => {foundOptionValue = value[0].value})
      expect(foundOptionValue).toEqual("national");
    });
  });

  // describe("Requirement 2", () => {
  //   describe("API throws error when rendering list of Pokedexs", () => {
  //     test("User is shown an error message", () => {
  //     // Given user attempting to select a Pokedex
  //     // When an error occurs from the API
  //     // Then they are presented an error message
  //     // And the list of Pokedexes does not render
  //     });

  //     test("List of pokedexes does not render", () => {

  //     });
  //   });
  // });

  // describe("Requirement 3", () => {
  //   test("When a View button is clicked the associated Pokedex is stored", () => {
      
  //   });
  // });

  describe("Requirement 4", () => {
    test("When a View button is clicked, the associated Pokedex's Pokemon is rendered", async () => {
      let foundOptionValue;
      // When the app is rendered intially 
      render(<App />)

      //and a pokedex is selected
      await waitFor(async () => {fireEvent.change(screen.getByPlaceholderText("Double-click for options"), {target: {value: "national"}})})
      
      //and "View" button is clicked
      await waitFor(async () => {fireEvent.click(screen.getByText("View"))})
      
      //Then display pokemon from pokedex
      await waitFor(async () => {screen.findAllByRole("option", {hidden: true}).then((value) => {foundOptionValue = value[0].value})})
      
      await waitFor(async () => {expect(foundOptionValue).toEqual("eevee");})
    });
  });

  // describe("Requirement 5", () => {
  //   describe("API throws error when selecting Pokemon", () => {
  //     test("User is shown error message", () => {
        
  //     });

  //     test("Pokemon list does not render", () => {

  //     });
  //   });
  // });

  // describe("Requirement 6", () => {
  //   test("When a View Details button is clicked the associated Pokemon is stored", () => {
  //     //
  //   });
  // });

  describe("Requirement 7", () => {
    describe("When a View Details button is clicked the associated Pokemon's details is rendered", () => {
      test("Pokemon sprite Rendered", async () => {
        // When the app is rendered intially 
        render(<App />)

        //and a pokedex is selected
        await waitFor(async () => {fireEvent.change(screen.getByPlaceholderText("Double-click for options"), {target: {value: "national"}})})
        
        //and "View" button is clicked
        await waitFor(async () => {fireEvent.click(screen.getByText("View"))})
        
        //and pokemon is selected

        await waitFor(async () => {fireEvent.change(screen.getByPlaceholderText("Double-click for options"), {target: {value: "eevee"}})})
        
        //and "View Details" button is clicked
        await waitFor(async () => {fireEvent.click(screen.getByText("View Details"))})
        await waitFor(async () => {screen.getByAltText("sprite image", { exact: false })})
      })
      test("Pokemon name Rendered", async () => {
        // When the app is rendered intially 
        render(<App />)

        //and a pokedex is selected
        await waitFor(async () => {fireEvent.change(screen.getByPlaceholderText("Double-click for options"), {target: {value: "national"}})})
        
        //and "View" button is clicked
        await waitFor(async () => {fireEvent.click(screen.getByText("View"))})
        
        //and pokemon is selected

        await waitFor(async () => {fireEvent.change(screen.getByPlaceholderText("Double-click for options"), {target: {value: "eevee"}})})
        
        //and "View Details" button is clicked
        await waitFor(async () => {fireEvent.click(screen.getByText("View Details"))})
        await waitFor(async () => {screen.getByText("eevee", { exact: false })})
      })
      test("Pokemon abilities Rendered", async () => {
        // When the app is rendered intially 
        render(<App />)

        //and a pokedex is selected
        await waitFor(async () => {fireEvent.change(screen.getByPlaceholderText("Double-click for options"), {target: {value: "national"}})})
        
        //and "View" button is clicked
        await waitFor(async () => {fireEvent.click(screen.getByText("View"))})
        
        //and pokemon is selected

        await waitFor(async () => {fireEvent.change(screen.getByPlaceholderText("Double-click for options"), {target: {value: "eevee"}})})
        
        //and "View Details" button is clicked
        await waitFor(async () => {fireEvent.click(screen.getByText("View Details"))})
        await waitFor(async () => {screen.getByText("run-away", { exact: false })})
      })
      test("Pokemon base stats Rendered", async () => {
        // When the app is rendered intially 
        render(<App />)

        //and a pokedex is selected
        await waitFor(async () => {fireEvent.change(screen.getByPlaceholderText("Double-click for options"), {target: {value: "national"}})})
        
        //and "View" button is clicked
        await waitFor(async () => {fireEvent.click(screen.getByText("View"))})
        
        //and pokemon is selected

        await waitFor(async () => {fireEvent.change(screen.getByPlaceholderText("Double-click for options"), {target: {value: "eevee"}})})
        
        //and "View Details" button is clicked
        await waitFor(async () => {fireEvent.click(screen.getByText("View Details"))})

        await waitFor(async () => {screen.getByText("Hp:")})
        await waitFor(async () => {screen.getByText("Attack:")})
        await waitFor(async () => {screen.getByText("Defense:")})
        await waitFor(async () => {screen.getByText("Special-attack:")})
        await waitFor(async () => {screen.getByText("Special-defense:")})
        await waitFor(async () => {screen.getByText("Speed:")})
      })
      test("Pokemon types Rendered", async () => {
        // When the app is rendered intially 
        render(<App />)

        //and a pokedex is selected
        await waitFor(async () => {fireEvent.change(screen.getByPlaceholderText("Double-click for options"), {target: {value: "national"}})})
        
        //and "View" button is clicked
        await waitFor(async () => {fireEvent.click(screen.getByText("View"))})
        
        //and pokemon is selected

        await waitFor(async () => {fireEvent.change(screen.getByPlaceholderText("Double-click for options"), {target: {value: "eevee"}})})
        
        //and "View Details" button is clicked
        await waitFor(async () => {fireEvent.click(screen.getByText("View Details"))})
        await waitFor(async () => {screen.getByText("normal", { exact: false })})
      })
    });
  });

  // describe("Requirement 8", () => {
  //   describe("API throws error when rendering selected Pokemon's details", () => {
  //     test("User is shown error message", () => {
        
  //     });

  //     test("Pokemon's details does not render", () => {
        
  //     });
  //   });
  // });

  // describe("Requirement 9", () => {
  //   test("User is returned to first screen when Home button is clicked", () => {
  //     //
  //   });
  // });

//   describe("Requirement 10", () => {
//     test("User is moved back one screen when Back button is clicked", () => {
//       //
//     });
//   });
});