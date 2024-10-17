
-- users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,  -- Encrypted password
    role VARCHAR(20) DEFAULT 'user',  -- 'guest', 'user', 'admin'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- auth table 
CREATE TABLE auth (
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(100),
    last_login TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY(user_id)
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
CREATE TABLE liked_pokemons (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    pokemon_id INT REFERENCES pokemons(id) ON DELETE CASCADE,
    liked_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY(user_id, pokemon_id)
);

-- Wall Posts Table
CREATE TABLE wall_posts (
    id SERIAL PRIMARY KEY,
    profile_id INT REFERENCES profile(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wall Post Replies Table
CREATE TABLE wall_post_replies (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES wall_posts(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    pokemon_id INT REFERENCES pokemons(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
--reply table
CREATE TABLE replies (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    comment_id INT REFERENCES comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- CREATE TABLE todos (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     description TEXT,
--     completed BOOLEAN DEFAULT FALSE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE tags (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(50) NOT NULL UNIQUE
-- );

-- CREATE TABLE todo_tags (
--     todo_id INTEGER REFERENCES todos(id) ON DELETE CASCADE,
--     tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
--     PRIMARY KEY (todo_id, tag_id)
-- );

-- INSERT INTO todos (title, description, completed) VALUES
--       ('Buy groceries', 'Milk, eggs, bread', false),
--       ('Finish project', 'Complete the report by Friday', false),
--       ('Call mom', 'Catch up and plan visit', true),
--       ('Exercise', 'Go for a 30-minute run', false),
--       ('Read book', 'Finish chapter 5 of "The Great Gatsby"', false);
      
-- INSERT INTO tags (name) VALUES
--       ('personal'),
--       ('work'),
--       ('health'),
--       ('urgent'),
--       ('leisure');
      
-- INSERT INTO todo_tags (todo_id, tag_id) VALUES
--       (1, 1), (1, 4), -- Buy groceries: personal, urgent
--       (2, 2), (2, 4), -- Finish project: work, urgent
--       (3, 1),         -- Call mom: personal
--       (4, 3),         -- Exercise: health
--       (5, 1), (5, 5);  -- Read book: personal, leisure