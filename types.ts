
export interface NavLink {
  label: string;
  href: string;
}

export interface PlanFeature {
  name: string;
  starter: string | boolean;
  growth: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

export interface PricingPlan {
  name: string;
  price: {
    monthly: string;
    annually: string;
  };
  description: string;
  features: string[];
  isPopular: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  imageUrl: string;
  author: string;
  date: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}
