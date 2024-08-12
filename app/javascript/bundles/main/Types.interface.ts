export interface Product {
  id: string;
  permalink: string;
  name: string;
  seller: {
    id: string;
    name: string;
    avatar_url: string;
    profile_url: string;
  };
  ratings: {
    count: number;
    average: number;
  };
  thumbnail_url?: string;
  native_type: string;
  quantity_remaining?: number;
  is_sales_limited: boolean;
  price_cents: number;
  currency_code: string;
  is_pay_what_you_want: boolean;
  url: string;
  duration_in_months?: number;
  recurrence?: string;
  description: string;
}

export interface Tag {
  key: string;
  doc_count: number;
}