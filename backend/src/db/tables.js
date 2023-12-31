const db = require('./db');

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        game_name VARCHAR(24),
        player1_board JSONB,
        player2_board JSONB,
        pin1 VARCHAR(6) NOT NULL,
        pin2 VARCHAR(6) NOT NULL,
        codes TEXT
      );
    `);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables', err);
  }
};

createTables();
