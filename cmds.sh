# backend
npm init
npm install express axios pg
npm install --save-dev nodemon

# postgres
docker build -t poke-db .
docker run --name poke-db-container -p 5432:5432 poke-db
docker compose up --build
docker compose down

# connect to a database
docker exec -it poke-db-container psql -U youruser -d tododb
# list all databases
\l
# switch to another database
\c <db-name>
# list database tables
\dt
# describe a table, e.g. \d todos, \d tags, \d todo_tags
\d <table-name>
# quit psql
\q

SELECT * FROM todos;
INSERT INTO todos (title, description) VALUES ('go to hive', 'learn javascript and SQL');
UPDATE todos SET completed=true WHERE id=6;
SELECT title, description FROM todos WHERE id>3;
SELECT * FROM todos WHERE title LIKE '%hive%';
SELECT * FROM todos WHERE title LIKE '%h_ve%';
# delete content from table; NOTE: add WHERE clause
DELETE FROM todos WHERE description LIKE '%javascript%';

# join tables
SELECT * FROM todos JOIN todo_tags ON todos.id=todo_tags.todo_id;
SELECT todos.title, todo_tags.* FROM todos JOIN todo_tags ON todos.id=todo_tags.todo_id;

# join todo_tags table
SELECT todos.title, todo_tags.*
FROM todos
LEFT JOIN todo_tags ON todos.id=todo_tags.todo_id;

# further join tags table
SELECT *
FROM todos
LEFT JOIN todo_tags ON todos.id=todo_tags.todo_id
LEFT JOIN tags on tags.id = todo_tags.tag_id;

SELECT todos.*, ARRAY_AGG(tags.name) as tags FROM todos # is as tags necessary here
LEFT JOIN todo_tags ON todos.id=todo_tags.todo_id
LEFT JOIN tags on tags.id = todo_tags.tag_id
GROUP BY todos.id;

# frontend
npm create vite@latest frontend
cd frontend
npm install
npm run dev