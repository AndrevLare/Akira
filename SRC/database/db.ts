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
    icon TEXT CHECK(length(icon) <= 2) DEFAULT 'A',
    status TEXT DEFAULT 'active' -- 'active', 'archived', 'deleted'
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
    daily_cards_limit INTEGER DEFAULT 100,
    algorithm TEXT DEFAULT 'SM-2',
    order_type INTEGER DEFAULT 0
  );
  INSERT OR IGNORE INTO srs_settings DEFAULT VALUES;
  
  CREATE TABLE IF NOT EXISTS notification_settings (
    notifications INTEGER DEFAULT 1,
    from_time TEXT DEFAULT '08:00',
    to_time TEXT DEFAULT '22:00',
    minimun_interval INTEGER DEFAULT 60, -- en minutos
    weekend_mode INTEGER DEFAULT 0,
    silent_mode INTEGER DEFAULT 0
  );
  INSERT OR IGNORE INTO notification_settings DEFAULT VALUES;

  CREATE TABLE IF NOT EXISTS settings (
    dark_mode INTEGER DEFAULT 0,
    haptics INTEGER DEFAULT 1,
    sounds INTEGER DEFAULT 1
  );
  INSERT OR IGNORE INTO settings DEFAULT VALUES;
  
  CREATE TABLE IF NOT EXISTS user_data (
    user_id TEXT DEFAULT 0,
    name TEXT DEFAULT 'User',
    email TEXT DEFAULT 'user@example.com',
    color TEXT DEFAULT '#69737d',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    plan TEXT DEFAULT 'free',
    total_decks INTEGER DEFAULT 0,
    archived_decks INTEGER DEFAULT 0,
    PRIMARY KEY (user_id)
  );
  INSERT OR IGNORE INTO user_data DEFAULT VALUES;
`;

  // Eliminar tablas para desarrollo !!! <---------------------------------------------------------------

  try {
    //await deleteTable("user_data");
    await (await db).execAsync(query);
    console.log("Tablas creadas o ya existían.");
  } catch (error) {
    console.error("Error al crear las tablas:", error);
  }
};

// Función para eliminar tablas (útil para desarrollo)
const deleteTable = async (tableName: string) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  try {
    await (await db).execAsync(query);
    console.log(`Tabla ${tableName} eliminada.`);
  } catch (error) {
    console.error(`Error al eliminar la tabla ${tableName}:`, error);
  }
};

export const deleteAllTables = async () => {
  await deleteTable("card");
  await deleteTable("deck");
  await deleteTable("study_stats");
  await deleteTable("srs_settings");
  await deleteTable("notification_settings");
  await deleteTable("settings");
  await deleteTable("user_data");
};
