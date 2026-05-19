/* 
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

  srs_settings
  notification_settings
  settings
  user_data 
   */

import { db } from "./db";

export const getSettingsSet = async (tableName: string) => {
  const query = `SELECT * FROM ${tableName} LIMIT 1`;
  try {
    const database = await db;
    const result = database.getFirstAsync(query);
    console.log(`(${tableName}) Settings obtained: `, result);
    return result;
  } catch (e) {
    console.log(`(${tableName}) Error obtaining settings`);
    throw e;
  }
};

export const updateSettingsSet = async (
  tableName: string,
  values: Record<string, any>,
) => {
  const ALLOWED_TABLES = [
    "srs_settings",
    "notification_settings",
    "settings",
    "user_data",
  ];

  if (!ALLOWED_TABLES.includes(tableName)) {
    throw new Error(`Invalid table name: ${tableName}`);
  }

  const keys = Object.keys(values);
  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const params = Object.values(values);

  const query = `UPDATE ${tableName} SET ${setClause}`;

  try {
    const database = await db;
    await database.runAsync(query, params);
    console.log(`(${tableName}) Settings updated: `, values);
  } catch (e) {
    console.log(`(${tableName}) Error updating settings`);
    throw e;
  }
};

/*
// Un solo campo
await updateSettingsSet("srs_settings", { daily_new_cards: 15 });

// Varios campos
await updateSettingsSet("notification_settings", { 
  from_time: "09:00", 
  to_time: "21:00" 
});
*/
