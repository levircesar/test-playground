// Helpers para localStorage
export function getJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function setJSON<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail
  }
}

// Chaves específicas do projeto
export const STORAGE_KEYS = {
  THEME: 'pp_theme',
  API_HISTORY: 'pp_api_history',
  TODOS: 'pp_todos',
  CONTACT_MSGS: 'pp_contact_msgs',
} as const;
