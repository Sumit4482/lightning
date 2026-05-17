import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '../../data/daily-logs.json');
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function loadDailyLogs() {
  const raw = await readFile(DATA_PATH, 'utf-8');
  const data = JSON.parse(raw);
  data.entries = Array.isArray(data.entries) ? data.entries : [];
  return data;
}

export async function saveDailyLogs(data) {
  await writeFile(DATA_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}

export function parseLeetCodeLine(line) {
  const trimmed = String(line).trim();
  if (!trimmed) {
    return null;
  }
  const parts = trimmed.split('|').map((p) => p.trim());
  if (parts.length >= 2) {
    return { title: parts[0], difficulty: parts[1] };
  }
  return { title: trimmed };
}

export function parseSkillList(value) {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value.map((s) => String(s).trim()).filter(Boolean);
  }
  return String(value)
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function normalizeEntry(body) {
  const date = body.date;
  if (!DATE_RE.test(date)) {
    throw new Error('Invalid date. Use YYYY-MM-DD.');
  }

  const problems = Array.isArray(body.leetcode?.problems)
    ? body.leetcode.problems
        .map((p) => ({
          title: String(p.title || '').trim(),
          difficulty: p.difficulty ? String(p.difficulty).trim() : undefined,
          url: p.url ? String(p.url).trim() : undefined,
        }))
        .filter((p) => p.title)
    : parseSkillList(body.leetcode?.problemsText)
        .map(parseLeetCodeLine)
        .filter(Boolean);

  return {
    date,
    leetcode: { problems },
    skills: {
      frontend: parseSkillList(body.skills?.frontend),
      backend: parseSkillList(body.skills?.backend),
      devops: parseSkillList(body.skills?.devops),
      ai: parseSkillList(body.skills?.ai),
    },
  };
}

export function upsertEntry(data, entry) {
  const next = { ...data, entries: [...data.entries] };
  const index = next.entries.findIndex((e) => e.date === entry.date);
  if (index >= 0) {
    next.entries[index] = entry;
  } else {
    next.entries.push(entry);
  }
  next.entries.sort((a, b) => b.date.localeCompare(a.date));
  return next;
}

function toDateString(date) {
  return date.toISOString().slice(0, 10);
}

export function eachDay(from, to) {
  const days = [];
  const cursor = new Date(`${from}T12:00:00.000Z`);
  const end = new Date(`${to}T12:00:00.000Z`);
  while (cursor <= end) {
    days.push(toDateString(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

function skillCount(entry) {
  const s = entry.skills;
  return (
    s.frontend.length + s.backend.length + s.devops.length + s.ai.length
  );
}

export function buildCalendar(entries, from, to) {
  const today = toDateString(new Date());
  const byDate = new Map(entries.map((e) => [e.date, e]));
  const days = eachDay(from, to);

  return days.map((date) => {
    const entry = byDate.get(date);
    if (!entry) {
      const status = date > today ? 'future' : 'missed';
      return { date, status, entry: null };
    }
    const lcCount = entry.leetcode?.problems?.length ?? 0;
    const skills = skillCount(entry);
    let status = 'empty';
    if (lcCount > 0) {
      status = 'logged';
    } else if (skills > 0) {
      status = 'skills';
    }
    return { date, status, entry };
  });
}

export function getDefaultRange() {
  const to = new Date();
  const from = new Date(to);
  from.setUTCDate(from.getUTCDate() - 29);
  return { from: toDateString(from), to: toDateString(to) };
}
