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

# Running the Database with Docker Compose

To run the database using Docker Compose, use the following command:

```bash
docker compose up --build -d
```

## File Structure

```
index.js
├── routes
├── controllers
├── services
└── models
```

---

## API Endpoints

### 1. Liked Pokémon

- **Endpoint**: `/api/pokemon/liked`
- **Method**: POST
- **Expected Request Body**:
  ```json
  {
    "user_id": 1,
    "pokemon_id": 1,
    "pokemon_name": "pikachu"
  }
  ```
- **Response**:
  ```json
  {
    "user_id": 1,
    "pokemon_id": 1
  }
  ```

### 2. Get Liked Pokémon by User

- **Endpoint**: `/api/user/:id/liked_pokemons`
- **Method**: GET
- **Request Params**: `id`
- **Response**:
  ```json
  [
    { "user_id": 1, "pokemon_id": 1, "pokemon_name": "pikachu" },
    { "user_id": 1, "pokemon_id": 2, "pokemon_name": "bulbasaur" },
    { "user_id": 1, "pokemon_id": 3, "pokemon_name": "charizard" }
  ]
  ```

### 3. Get Profiles

- **Endpoint**: `/api/profile/`
- **Method**: GET
- **Response**:
  ```json
  [{}]
  ```

### 4. Get Profile by ID

- **Endpoint**: `/api/profile/:id`
- **Method**: GET
- **Response**:
  ```json
  {}
  ```

### 5. Create Profile

- **Endpoint**: `/api/profile/create`
- **Method**: POST
- **Request Body (Form Data)**:
  ```json
  {
    "user_id": 2,
    "name": "lorem",
    "bio": "lorem ipsum",
    "profile_pic": "xxx"
  }
  ```
- **Response**:
  ```json
  {
    "id": 10,
    "user_id": 2,
    "name": "lorem",
    "bio": "lorem ipsum",
    "profile_pic": "xxx",
    "created_at": "2024-10-17T16:17:08.085Z",
    "updated_at": "2024-10-17T16:17:08.085Z"
  }
  ```

### 6. Update Profile by ID

- **Endpoint**: `/api/profile/update/:id`
- **Method**: PUT
- **Request Params**: `id`
- **Request Body (Form Data)**:
  ```json
  {
    "user_id": 2,
    "name": "lorem",
    "bio": "lorem ipsum",
    "profile_pic": "xxx"
  }
  ```
- **Response**:
  ```json
  {
    "id": 10,
    "user_id": 2,
    "name": "lorem",
    "bio": "lorem ipsum",
    "profile_pic": "xxx",
    "created_at": "2024-10-17T16:17:08.085Z",
    "updated_at": "2024-10-17T16:17:08.085Z"
  }
  ```

### 7. Update Profile Name by ID

- **Endpoint**: `/api/profile/update/:id/name`
- **Method**: PATCH
- **Request Params**: `id`
- **Request Body**:
  ```json
  { "name": "new name" }
  ```
- **Response**:
  ```json
  {
    "id": 10,
    "user_id": 2,
    "name": "new name",
    "bio": "lorem ipsum",
    "profile_pic": "xxx",
    "created_at": "2024-10-17T16:17:08.085Z",
    "updated_at": "2024-10-17T16:17:08.085Z"
  }
  ```

### 8. Update Profile Bio by ID

- **Endpoint**: `/api/profile/update/:id/bio`
- **Method**: PATCH
- **Request Params**: `id`
- **Request Body**:
  ```json
  { "bio": "new bio" }
  ```
- **Response**:
  ```json
  {
    "id": 10,
    "user_id": 2,
    "name": "new name",
    "bio": "new bio",
    "profile_pic": "xxx",
    "created_at": "2024-10-17T16:17:08.085Z",
    "updated_at": "2024-10-17T16:17:08.085Z"
  }
  ```

### 9. Update Profile Picture by ID

- **Endpoint**: `/api/profile/update/:id/profile_pic`
- **Method**: PATCH
- **Request Params**: `id`
- **Request Body**:
  ```json
  { "profile_pic": "new_pic_url" }
  ```
- **Response**:
  ```json
  {
    "id": 10,
    "user_id": 2,
    "name": "new name",
    "bio": "new bio",
    "profile_pic": "new_pic_url",
    "created_at": "2024-10-17T16:17:08.085Z",
    "updated_at": "2024-10-17T16:17:08.085Z"
  }
  ```
