## Overview
A brief description of the API and example responses.

## Base URL
https://localhost.com:3000/api

## Endpoints

### 1. Get a list of Pokémon, given limit and offset
- **Endpoint**: `/api/pokemon`
- **Method**: `GET`
- **Description**: Fetches the details of a list of Pokémon. 
Limit: Number of Pokémon per page; offset: How many Pokémon to skip
- **Response**:
  - **200 OK**
    ```json
    [
      {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/",
        "id": 1,
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
      },
      {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon/2/",
        "id": 2,
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
      },
      ...
    ]
    ```

### 2. Get Pokémon by Name
- **Endpoint**: `/api/pokemon/:name?`
- **Method**: `GET`
- **Description**: Fetches the details of a Pokémon by its name.
- **Path Parameters**:
  - `name` (string, required): Name of the Pokémon.
- **Response**:
  - **200 OK**
    ```json
    {
      "abilities": [
      {
        "ability": {
          "name": "static",
          "url": "https://pokeapi.co/api/v2/ability/9/"
        },
        "is_hidden": false,
        "slot": 1
      },
      ...
      ],
      "base_experience":112,
      ...
    }
    ```
  - **404 Not Found**
    ```json
    {
      "error": "Pokémon not found."
    }
    ```

### 3. Get Pokémon by Type
- **Endpoint**: `/api/pokemon/type/:type?`
- **Method**: `GET`
- **Description**: Fetches the details of a list of Pokémon by its type.
- **Path Parameters**:
  - `type` (string, required): Type of the Pokémon.
- **Response**:
  - **200 OK**
    ```json
    [
      {
        "name": "charmander",
        "url": "https://pokeapi.co/api/v2/pokemon/4/"
      },
      {
        "name": "charmeleon",
        "url": "https://pokeapi.co/api/v2/pokemon/5/"
      },   
      ...
    ]
    ```
  - **404 Not Found**
    ```json
    {
      "error": "Pokémon not found."
    }
    ```

### 4. Get a list of Pokémon by query
- **Endpoint**: `/api/pokemon/search/:query?`
- **Method**: `GET`
- **Description**: Fetches a list of Pokémon based on a substring match.
- **Path Parameters**:
  - `query` (string, required): The string entered in the search bar.
- **Response**:
  - **200 OK**
    ```json
    [
    {
      "name": "pikachu",
      "url": "https://pokeapi.co/api/v2/pokemon/25/",
      "id": 25,
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    },
    {
      "name": "magikarp",
      "url": "https://pokeapi.co/api/v2/pokemon/129/",
      "id": 129,
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png"
    },
      ...
    ]
    ```
  - **404 Not Found**
    ```json
    {
      "error": "No matching Pokémon found."
    }
    ```
