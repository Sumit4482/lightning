export interface LeetCodeProblem {
  title: string;
  difficulty?: string;
  url?: string;
}

export interface DailySkills {
  frontend: string[];
  backend: string[];
  devops: string[];
  ai: string[];
}

export interface DailyEntry {
  date: string;
  leetcode: { problems: LeetCodeProblem[] };
  skills: DailySkills;
}

export interface DailyTodayResponse {
  date: string;
  entry: DailyEntry | null;
}

export interface CalendarDay {
  date: string;
  status: 'logged' | 'skills' | 'empty' | 'missed' | 'future';
  entry: DailyEntry | null;
}

export interface DailyHistoryResponse {
  from: string;
  to: string;
  entries: DailyEntry[];
  calendar: CalendarDay[];
  missedDates: string[];
}

export interface DailyPublishPayload {
  date: string;
  leetcode: {
    problemsText?: string;
    problems?: LeetCodeProblem[];
  };
  skills: {
    frontend: string;
    backend: string;
    devops: string;
    ai: string;
  };
}
