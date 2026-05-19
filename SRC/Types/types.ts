export interface DeckInfo {
  id: number;
  name: string;
  created_at: string;
  color: string;
  icon: string;
  card_count: number;
  review_debt: number;
  new_cards: number;
  status: "active" | "archived" | "deleted";
}

export interface CardInfo {
  id: number;
  front: string;
  back: string;
  interval: number;
  next_review_at: string;
  status: number;
  deck_id: number;
}

export interface UserInfo {
  id: number | null;
  name: string;
  color: string;
  email: string;
  created_at: string;
  plan: string;
  total_decks: number;
  archived_decks: number;
}

export interface Settings {
  dark_mode: number;
  haptics: number;
  sounds: number;
}

export interface SRS_Settings {
  daily_notifications: number;
  daily_new_cards: number;
  daily_cards_limit: number;
  algorithm: "SM-2" | "custom";
  order_type: 0 | 1 | 2; // 0 Mixed / 1 New cards first / 2 Due first
}

export interface Notification_Settings {
  notifications: number;
  from_time: string; // Hora en formato HH:MM
  to_time: string; // Hora en formato HH:MM
  minimun_interval: number; // Intervalo mínimo entre notificaciones en minutos
  weekend_mode: number;
  silent_mode: number;
}
