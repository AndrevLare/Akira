import { db } from "./db";

export const createDeck = async (name: string, color: string, icon: string) => {
  const query = /*sql*/ `
    INSERT INTO deck (name, color, icon) VALUES (?, ?, ?);
  `;

  try {
    const database = await db;
    
    const result = await database.runAsync(query, [name, color, icon]);
    
    console.log("Deck creado con ID:", result.lastInsertRowId);
    return result.lastInsertRowId; // Útil para navegar al mazo recién creado
  } catch (e) {
    console.error("Error creating the deck:", e);
    throw e; 
  }
};

export const deteleDeck = async (id: number) => {
    const query = /*sql*/ `
    DELETE FROM deck WHERE id = ?
    `
    try {
        const database = await db;

        const result = await database.runAsync(query, [id])
        console.log(`Deck ${id} and its card correcly deleted.`);
    } catch (e) {
        console.error("Error deleting the deck:", e);
        throw e;
    }
}

export const GetAllDecks = async () => {
    const query = /*sql*/`
    SELECT * FROM deck ORDERED BY name
    `
    try {
      const databse = await db;

      const result = await databse.getAllAsync(query);

      console.log(`decks obtained: ${result}`)

      return result
    } catch (e) {
      console.log("Error obtaining decks")
      throw(e);
    }
}

export const GetDeckCards = async (deck_id: number) => {
    const query = /*sql*/`
    SELECT * FROM card WHERE deck_id = ?
    `

    try {
      const database = await db;

      const result = database.getAllAsync(query, [deck_id]);
      console.log("cards obtained: ", result)

      return result
    } catch (e) {
      console.log("Error obtaining cards")
      throw (e);
    }
}