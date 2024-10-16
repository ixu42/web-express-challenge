const axios = require("axios");
const db = require("../database/db");

const insertPokemon = async (pokemon) => {
  const text =
    "INSERT INTO pokemons(name, api_id, url) VALUES($1, $2, $3) ON CONFLICT (name) DO NOTHING RETURNING id";
  const values = [
    pokemon.name,
    pokemon.id,
    `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
  ];
  const res = await db.query(text, values);
  return res.rows[0]?.id;
};

const insertType = async (type) => {
  const text =
    "INSERT INTO types(type) VALUES($1) ON CONFLICT (type) DO NOTHING  RETURNING id";
  const res = await db.query(text, [type]);
  return (
    res.rows[0]?.id ||
    (await db.query("SELECT id FROM types WHERE type = $1", [type])).rows[0].id
  );
};

const insertPokemonTypes = async (pokemonId, typeId) => {
  const queryText =
    "INSERT INTO pokemon_types(pokemon_id, type_id) VALUES($1, $2) ON CONFLICT DO NOTHING";
  const queryValues = [pokemonId, typeId];
  await db.query({ text: queryText, values: queryValues });
};

const savePokemon = async (pokemon) => {
  try {
    const pokemonId = await insertPokemon(pokemon);
    console.log("pokemonId", pokemonId);

    const typeIds = await Promise.all(
      pokemon.types.map((type) => insertType(type.type.name))
    );
    console.log("typeIds", typeIds);
    if (pokemonId && typeIds) {
      await Promise.all(
        typeIds.map((typeId) => insertPokemonTypes(pokemonId, typeId))
      );
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  savePokemon,
};
