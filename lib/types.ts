export interface Career {
  id: string;
  position: string;
  company: string;
  location?: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description?: string;
  skills?: string[];
  order: number;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface Settings {
  app_name: string;
  email_hire: string;
  portfolio_url: string;
  phone?: string;
  address?: string;
  about_short?: string;
}
