type Dict = Record<string, string>;
const en: Dict = { welcome: "Welcome", board: "Board", calendar: "Calendar", admin: "Admin", settings: "Settings" };
const he: Dict = { welcome: "ברוך הבא", board: "לוח", calendar: "לוח שנה", admin: "ניהול", settings: "הגדרות" };
const dicts: Record<string, Dict> = { en, he };
export function t(locale: string, key: string) { return dicts[locale]?.[key] ?? key; } 