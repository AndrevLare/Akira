import { db } from "./db";

export const createCard = async (
  front: string,
  back: string,
  deck_id: number,
) => {
  const query = /*sql*/ `
    INSERT INTO card (front, back, deck_id) VALUES (?, ?, ?)
  `;
  try {
    const response = await (await db).runAsync(query, [front, back, deck_id]);
    console.log("Tarjeta creada exitosamente.");
    return response.lastInsertRowId; // Devuelve el ID de la nueva tarjeta
  } catch (error) {
    console.error("Error al crear la tarjeta:", error);
    throw error;
  }
};
