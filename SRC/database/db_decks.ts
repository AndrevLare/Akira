import { db } from "./db";

export const createDeck = async (name: string, color: string, icon: string) => {
  try {
    const database = await db;
    let insertedId = 0;

    await database.withTransactionAsync(async () => {
      const result = await database.runAsync(
        /*sql*/ `INSERT INTO deck (name, color, icon) VALUES (?, ?, ?)`,
        [name, color, icon],
      );
      insertedId = result.lastInsertRowId;
      await database.runAsync(
        /*sql*/ `UPDATE user_data SET total_decks = total_decks + 1`,
      );
    });

    console.log("(db_decks) Deck creado con ID:", insertedId);
    return insertedId;
  } catch (e) {
    console.error("Error creating the deck:", e);
    throw e;
  }
};

export const deleteDeck = async (id: number) => {
  try {
    const database = await db;

    await database.withTransactionAsync(async () => {
      await database.runAsync(/*sql*/ `DELETE FROM deck WHERE id = ?`, [id]);
      await database.runAsync(
        /*sql*/ `UPDATE user_data SET total_decks = total_decks - 1`,
      );
    });

    console.log(`Deck ${id} and its cards correctly deleted.`);
  } catch (e) {
    console.error("Error deleting the deck:", e);
    throw e;
  }
};

export const GetAllDecks = async (): Promise<any[]> => {
  const query = /*sql*/ `
    SELECT 
        d.*, 
        COUNT(c.id) as card_count, 
        COUNT(CASE WHEN c.next_review_at <= CURRENT_TIMESTAMP AND c.interval > 0 THEN 1 END) as review_debt,
        COUNT(CASE WHEN c.interval = 0 THEN 1 END) as new_cards
    FROM deck AS d 
    LEFT JOIN card AS c ON c.deck_id = d.id
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
    SELECT 
        *,
        CASE
            WHEN interval = 0 THEN 1 -- Estado NUEVA (Marrón/Rojo - akira-hard)                                                     x = 0
            WHEN interval < 1 AND DATE(next_review_at) = DATE('now') THEN 2 -- Estado APRENDIENDO (Verde Oscuro - akira-good)   0 < x < 1
            WHEN interval >= 1 THEN 3 -- Estado REPASO / GRADUADA (Verde Claro - akira-easy)                                   1 <= x
        END AS status
    FROM card
    WHERE deck_id = ?
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

export const GetDeckById = async (id: number) => {
  const query = /*sql*/ `
    SELECT 
        d.*, 
        COUNT(c.id) as card_count, 
        COUNT(CASE WHEN c.next_review_at <= CURRENT_TIMESTAMP AND c.interval > 0 THEN 1 END) as review_debt,
        COUNT(CASE WHEN c.interval = 0 THEN 1 END) as new_cards
    FROM deck AS d
    LEFT JOIN card AS c ON c.deck_id = d.id
    WHERE d.id = ?
    GROUP BY d.id
`;

  try {
    const database = await db;
    const result = database.getFirstAsync(query, [id]);
    console.log("(db_decks) deck obtained: ", result);

    return result;
  } catch (e) {
    console.log("(db_decks) Error obtaining the deck");
    throw e;
  }
};

export const UpdateDeck = async (
  id: number,
  name: string,
  color: string,
  icon: string,
) => {
  const query = /*sql*/ `
    UPDATE deck SET name = ?, color = ?, icon = ? WHERE id = ?
    `;
  try {
    const database = await db;
    const result = database.runAsync(query, [name, color, icon, id]);
    console.log(
      `Deck ${id} updated with name: ${name}, color: ${color}, icon: ${icon}`,
    );
    return result;
  } catch (e) {
    console.log("(db_decks) Error updating the deck");
    throw e;
  }
};

export const archiveDeck = async (id: number, archive: boolean) => {
  try {
    const database = await db;
    const newStatus = archive ? "archived" : "active";
    const delta = archive ? 1 : -1;

    await database.withTransactionAsync(async () => {
      await database.runAsync(
        /*sql*/ `UPDATE deck SET status = ? WHERE id = ?`,
        [newStatus, id],
      );
      await database.runAsync(
        /*sql*/ `UPDATE user_data SET archived_decks = archived_decks + ?`,
        [delta],
      );
    });

    console.log(`Deck ${id} status updated to: ${newStatus}`);
  } catch (e) {
    console.log("(db_decks) Error updating the deck status");
    throw e;
  }
};
