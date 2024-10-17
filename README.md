run database with docker compose
  -docker compose up --build -d
file structure
  index.js -> routes -> controllers -> services -> models
1. liked pokemon
  -endpoint - /api/pokemon/liked
  -method - post
  - expected request body:
    - { user_id, pokemon_id, pokemon_name}
  - response:
    - 200 ok
    - { user_id: , pokemon_id }
2. get liked pokemons by user
  -endpoint - /api/user/:id/liked_pokemons
  - method get
  - request params id
  - response:
      [
    {
        "user_id": 1,
        "pokemon_id": 1,
        "pokemon_name": "pikachu"
    },
    {
        "user_id": 1,
        "pokemon_id": 2,
        "pokemon_name": "bulbasaur"
    },
    {
        "user_id": 1,
        "pokemon_id": 3,
        "pokemon_name": "charizard"
    }
]
3.get profiles
    -endpoint - /api/profile/
    -method - get
    -response - [{}]
4.get profile by id
    -endpoint - /api/profile/:id
    -method - get
    -response - {}
5.create profile
    -endpoint - /api/profile/create
    -method - post
    - req body in form data
        - {user_id, name, bio, profile_pic }
    -response
        - {
            "id": 10,
            "user_id": 2,
            "name": "lorem",
            "bio": "lorem ipsum",
            "profile_pic": xxx,
            "created_at": "2024-10-17T16:17:08.085Z",
            "updated_at": "2024-10-17T16:17:08.085Z"
          }
  6. update profile by id
    -endpoint  - /api/profile/update/:id
    -method - put
    - req params id
    - req body in form data
        - {user_id, name, bio, profile_pic }
    -response
        - {
            "id": 10,
            "user_id": 2,
            "name": "lorem",
            "bio": "lorem ipsum",
            "profile_pic": xxx,
            "created_at": "2024-10-17T16:17:08.085Z",
            "updated_at": "2024-10-17T16:17:08.085Z"
          }
 7. update profile name by id
    -endpoint -  /api/profile/update/:id/name
    -method - patch
    - req params id
    - req body - {name}
    - response
        - {
            "id": 10,
            "user_id": 2,
            "name": "name",
            "bio": "lorem ipsum",
            "profile_pic": xxx,
            "created_at": "2024-10-17T16:17:08.085Z",
            "updated_at": "2024-10-17T16:17:08.085Z"
          }
  8.update profile bio by id
    -endpoint - /api/profile/update/:id/bio
     -method - patch
    - req params id
    - req body - {bio}
    - response
        - {
            "id": 10,
            "user_id": 2,
            "name": "name",
            "bio": "lorem ipsum",
            "profile_pic": xxx,
            "created_at": "2024-10-17T16:17:08.085Z",
            "updated_at": "2024-10-17T16:17:08.085Z"
          }
 9. update profile pic by id
    -endpoint - /api/profile/update/:id/profile_pic
     -method - patch
    - req params id
    - req body - {profile_pic}
    - response
        - {
            "id": 10,
            "user_id": 2,
            "name": "name",
            "bio": "lorem ipsum",
            "profile_pic": xxx,
            "created_at": "2024-10-17T16:17:08.085Z",
            "updated_at": "2024-10-17T16:17:08.085Z"
          }
   
