export interface DeckInfo {
  id: number;
  name: string;
  created_at: string;
  color: string;
  icon: string;
  card_count: number;
  review_debt: number;
  new_cards: number;
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
  id: number;
  name: string;
  color: string;
  email: string;
  created_at: string;
  plan: string;
}

export interface SRS_Settings {
  daily_notifications: number;
  daily_new_cards: number;
  daily_cards_limit: number;
  algorithm: "SM-2" | "custom";
  order: 0 | 1 | 2; // 0 Mixed / 1 New cards first / 2 Due first
}

export interface Settings {
  key: string;
  value: string;
}

/*
NotificationsStart type: string
NotificationsEnd type: string
DarkMode type: boolean
*/
