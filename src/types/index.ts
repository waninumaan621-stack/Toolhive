export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  isAI?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  toolCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface AdminStats {
  todayVisitors: number;
  totalVisitors: number;
  todayToolUses: number;
  totalToolUses: number;
  topTools: { name: string; uses: number }[];
  visitorsByCountry: { country: string; flag: string; count: number }[];
  weeklyData: { day: string; visitors: number; toolUses: number }[];
}
