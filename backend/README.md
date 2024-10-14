## Overview
A brief description of the API and example responses.

## Base URL
https://localhost.com:3000/api

## Endpoints

### 1. Get a list of Pokémon
- **Endpoint**: `/api/pokemon`
- **Method**: `GET`
- **Description**: Fetches the details of a non-exhaustive list of 42 Pokémon.
- **Response**:
  - **200 OK**
    ```json
    [
      {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/"
      },
      {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon/2/"
      },
      ...
    ]
    ```

### 2. Get Pokémon by Name
- **Endpoint**: `/api/pokemon/:name`
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
- **Endpoint**: `/api/pokemon/type/:type`
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
