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
