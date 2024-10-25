CREATE TYPE relationship_type AS ENUM ('like', 'dislike');

-- users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,  -- Encrypted password
    role VARCHAR(20) DEFAULT 'user',  -- 'guest', 'user', 'admin'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Profile Table
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100),
    bio TEXT,
    profile_pic BYTEA,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- pokemons table
CREATE TABLE pokemons (
    --id SERIAL PRIMARY KEY,
    id INT UNIQUE NOT NULL,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- liked_pokemons table
-- many to many relationship between users and pokemons
CREATE TABLE user_pokemons (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    pokemon_id INT REFERENCES pokemons(id) ON DELETE CASCADE,
    relationship relationship_type,
    reacted_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY(user_id, pokemon_id)
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();  -- Set the 'updated_at' column to the current timestamp
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON users  -- Table where trigger applies
FOR EACH ROW  -- Applies to each row affected by the update
EXECUTE FUNCTION update_updated_at_column();


CREATE TRIGGER set_updated_at
BEFORE UPDATE ON profiles  -- Table where trigger applies
FOR EACH ROW  -- Applies to each row affected by the update
EXECUTE FUNCTION update_updated_at_column();