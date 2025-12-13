import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import { app } from "electron";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEV_DB_NAME = "dev.sqlite";
const PROD_DB_NAME = "zolt.sqlite";

function resolveDevDbPath(): string {
  const base = app.getAppPath();
  return path.join(base, "database", "data", DEV_DB_NAME);
}

function getModelsDir(): string {
  const base = app.getAppPath();
  return path.join(base, "database", "models");
}

function getSeedsDir(): string {
  const base = app.getAppPath();
  return path.join(base, "database", "seeds");
}

function resolveProdDbPath(): string {
  const userDataDir = app.getPath("userData");
  return path.join(userDataDir, PROD_DB_NAME);
}

function ensureDirectory(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function createConnection(dbPath: string): Database.Database {
  ensureDirectory(dbPath);
  const db = new Database(dbPath);
  db.pragma("foreign_keys = ON");
  db.pragma("journal_mode = WAL");
  return db;
}

function createTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS sets (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS teams (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      logoUrl TEXT,
      configuration JSON NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS round_categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      defaultConfiguration JSON NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS rounds (
      id TEXT PRIMARY KEY,
      setId TEXT NOT NULL,
      categoryId TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      position INTEGER NOT NULL,
      configuration JSON NOT NULL,
      confirmationRequired BOOLEAN DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (setId) REFERENCES sets(id),
      FOREIGN KEY (categoryId) REFERENCES round_categories(id)
    );

    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      roundId TEXT NOT NULL,
      prompt JSON NOT NULL,
      answer JSON NOT NULL,
      hints JSON,
      overrides JSON,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (roundId) REFERENCES rounds(id)
    );

    CREATE TABLE IF NOT EXISTS matches (
      id TEXT PRIMARY KEY,
      setId TEXT NOT NULL,
      status TEXT CHECK (status IN ('upcoming', 'live', 'completed')) NOT NULL,
      startedAt DATETIME,
      endedAt DATETIME,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (setId) REFERENCES sets(id)
    );

    CREATE TABLE IF NOT EXISTS match_teams (
      id TEXT PRIMARY KEY,
      matchId TEXT NOT NULL,
      teamId TEXT NOT NULL,
      displayName TEXT NOT NULL,
      score INTEGER DEFAULT 0,
      standing INTEGER,
      currentTurn BOOLEAN DEFAULT 0,
      gameplayState JSON NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (matchId) REFERENCES matches(id),
      FOREIGN KEY (teamId) REFERENCES teams(id)
    );

    CREATE TABLE IF NOT EXISTS score_events (
      id TEXT PRIMARY KEY,
      matchTeamId TEXT NOT NULL,
      roundId TEXT,
      questionId TEXT,
      delta INTEGER NOT NULL,
      reason TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (matchTeamId) REFERENCES match_teams(id)
    );

    CREATE TABLE IF NOT EXISTS organizations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      imageUrl TEXT,
      description TEXT,
      selectedTheme TEXT,
      masterPin TEXT NOT NULL,
      themeModal JSON NOT NULL,
      statsModal JSON NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

function applySchemasFromModelFiles(db: Database.Database): boolean {
  const modelsDir = getModelsDir();
  if (!fs.existsSync(modelsDir)) return false;

  const preferredOrder = [
    "sets.model.sqlite",
    "teams.model.sqlite",
    "round-categories.model.sqlite",
    "rounds.model.sqlite",
    "questions.model.sqlite",
    "matches.model.sqlite",
    "match-teams.model.sqlite",
    "score-events.model.sqlite",
    "organization.model.sqlite",
  ];

  const files = fs
    .readdirSync(modelsDir)
    .filter(
      (name) =>
        /\.sql$|\.model\.sqlite$/i.test(name) &&
        name !== DEV_DB_NAME &&
        name !== PROD_DB_NAME
    )
    .sort((a, b) => {
      const aIdx = preferredOrder.indexOf(a);
      const bIdx = preferredOrder.indexOf(b);
      return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
    });

  if (files.length === 0) return false;

  for (const file of files) {
    const fullPath = path.join(modelsDir, file);
    try {
      const sql = fs.readFileSync(fullPath, "utf-8");
      db.exec(sql);
    } catch (err) {
      console.warn(`Skipping schema file ${file}:`, err);
    }
  }

  return true;
}

function applySeedsFromFiles(db: Database.Database): boolean {
  const seedsDir = getSeedsDir();
  if (!fs.existsSync(seedsDir)) return false;

  const files = fs
    .readdirSync(seedsDir)
    .filter((name) => /\.insert\.sqlite$|\.seed\.sql$/i.test(name))
    .sort();

  if (files.length === 0) return false;

  for (const file of files) {
    const fullPath = path.join(seedsDir, file);
    try {
      const sql = fs.readFileSync(fullPath, "utf-8");
      db.exec(sql);
    } catch (err) {
      console.warn(`Skipping seed file ${file}:`, err);
    }
  }

  return true;
}

export function getDatabase(): Database.Database {
  const dbPath = app.isPackaged ? resolveProdDbPath() : resolveDevDbPath();
  const db = createConnection(dbPath);
  const schemasApplied = applySchemasFromModelFiles(db);
  if (!schemasApplied) {
    createTables(db);
  }
  applySeedsFromFiles(db);
  return db;
}

export type SqliteInstance = Database.Database;
