import { db } from "./db";

export const createDeck = async (name: string, color: string, icon: string) => {
  const query = /*sql*/ `
    INSERT INTO deck (name, color, icon) VALUES (?, ?, ?);
  `;

  try {
    const database = await db;

    const result = await database.runAsync(query, [name, color, icon]);

    console.log("(db_decks) Deck creado con ID:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (e) {
    console.error("Error creating the deck:", e);
    throw e;
  }
};

export const deleteDeck = async (id: number) => {
  const query = /*sql*/ `
    DELETE FROM deck WHERE id = ?
    `;
  try {
    const database = await db;

    const result = await database.runAsync(query, [id]);

    console.log(`Deck ${id} and its card correcly deleted.`);
    return result.lastInsertRowId;
  } catch (e) {
    console.error("Error deleting the deck:", e);
    throw e;
  }
};

export const GetAllDecks = async (): Promise<any[]> => {
  const query = /*sql*/ `
    SELECT d.*, COUNT(c.id) as card_count, COUNT(CASE WHEN c.next_review_at <= CURRENT_TIMESTAMP THEN 1 END) as review_debt
    FROM deck AS d LEFT JOIN card AS c
    ON c.deck_id = d.id
    GROUP BY d.id
    ORDER BY d.name
    `;
  try {
    const database = await db;

    const result = await database.getAllAsync(query);

    console.log(`decks obtained: ${result}`);

    return result;
  } catch (e) {
    console.log("(db_decks) Error obtaining decks");
    throw e;
  }
};

export const GetDeckCards = async (deck_id: number) => {
  const query = /*sql*/ `
    SELECT * FROM card WHERE deck_id = ?
    `;

  try {
    const database = await db;

    const result = database.getAllAsync(query, [deck_id]);
    console.log("(db_decks) cards obtained: ", result);

    return result;
  } catch (e) {
    console.log("(db_decks) Error obtaining cards");
    throw e;
  }
};
