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

export const updateCard = async (
  id: number,
  front: string,
  back: string,
  deck_id: number,
) => {
  const query = /*sql*/ `
    UPDATE card SET front = ?, back = ?, deck_id = ? WHERE id = ?
  `;
  try {
    const response = await (
      await db
    ).runAsync(query, [front, back, deck_id, id]);
    console.log("Tarjeta actualizada exitosamente.");
    return response; // Devuelve el resultado de la actualización
  } catch (error) {
    console.error("Error al actualizar la tarjeta:", error);
    throw error;
  }
};

export const deleteCard = async (id: number) => {
  const query = /*sql*/ `
    DELETE FROM card WHERE id = ?
  `;
  try {
    const response = await (await db).runAsync(query, [id]);
    console.log("Tarjeta eliminada exitosamente.");
    return response; // Devuelve el resultado de la eliminación
  } catch (error) {
    console.error("Error al eliminar la tarjeta:", error);
    throw error;
  }
};
