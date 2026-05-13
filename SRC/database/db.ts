import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseAsync("Akira.db");

export const createTables = async () => {
  const query = /*sql*/ `

  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS deck (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    color TEXT DEFAULT '#FFFFFF',
    icon TEXT CHECK(length(icon) <= 2) DEFAULT 'A'
  );

  CREATE TABLE IF NOT EXISTS card (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    deck_id INTEGER NOT NULL,
    front TEXT NOT NULL,
    back TEXT NOT NULL,

    -- algorithm control
    reps INTEGER DEFAULT 0,
    interval INTEGER DEFAULT 0,
    ease_factor REAL DEFAULT 2.5,

    -- time control
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    next_review_at TIMESTAMP,

    FOREIGN KEY (deck_id) REFERENCES deck(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS study_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id INTEGER NOT NULL,
    deck_id INTEGER NOT NULL,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    rating TEXT NOT NULL, -- 'again', 'hard', 'good', 'easy'
    response_time_ms INTEGER, -- Opcional: ¿cuánto tardó en responder?
    
    FOREIGN KEY (card_id) REFERENCES card (id) ON DELETE CASCADE,
    FOREIGN KEY (deck_id) REFERENCES deck (id) ON DELETE CASCADE
  );
  
  CREATE TABLE IF NOT EXISTS srs_settings (
    daily_notifications INTEGER DEFAULT 10,
    daily_new_cards INTEGER DEFAULT 10,
    daily_cards_limit INTEGER DEFAULT 100
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY, -- El nombre del ajuste (ej: 'dark_mode')
    value TEXT NOT NULL    -- El valor (ej: 'true', 'english', '20:00')
  );
  
  CREATE TABLE IF NOT EXISTS user_data (
    user_id TEXT NOT NULL,
    name TEXT,
    email TEXT,
    color, TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    plan TEXT DEFAULT 'free',
    PRIMARY KEY (user_id)

  );
`;

  try {
    await (await db).execAsync(query);
    console.log("Tablas creadas o ya existían.");
  } catch (error) {
    console.error("Error al crear las tablas:", error);
  }
};
