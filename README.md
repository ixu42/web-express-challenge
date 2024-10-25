# Pokédex App

Welcome to the Pokédex App! This application allows users to explore and interact with a vast collection of Pokémon. Users can browse Pokémon, view their details, and manage their favorites through a user-friendly interface.

## Features

- **Browse Pokémon**: View a comprehensive list of Pokémon with pagination support. The list can also be shuffled.
- **Search Functionality**: Quickly find a Pokémon by name or type.
- **Sorting Options**: Sort Pokémon by ascending ID, descending ID, alphabetical order (A-Z), reverse alphabetical order (Z-A), or number of likes or dislikes received from users.
- **User Authentication**: Create an account or log in to save your favorite Pokémon.
- **Favorites Management**: Like and dislike Pokémon.

## Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS for styling
  - React Testing Library for testing

- **Backend**:
  - Express.js
  - Node.js

- **Database**:
  - PostgreSQL (managed via Docker)

- **External API**:
  - Utilizes the Pokémon API for fetching Pokémon data.

## Installation

To run the Pokédex App locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ixu42/web-express-challenge.git && cd web-express-challenge
   ```
2. **Set up the database**: \
	Ensure you have Docker installed and running; \
	Run the PostgreSQL container;
   ```bash
   cd backend/database
   docker compose up
   ```
3. **Set up the backend**:
   ```bash
	cd backend
	npm install
	npm run dev
	```
4. **Set up the frontend**:
	```bash
	cd frontend/pokedex_app
	npm install
	npm run dev
	```
5. Open your browser and navigate to http://localhost:5173 to see the app in action!
