/*
  Warnings:

  - Added the required column `title` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Output` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" REAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dashboardId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Entry_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Entry_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "EntryCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entry" ("categoryId", "dashboardId", "date", "description", "id", "value") SELECT "categoryId", "dashboardId", "date", "description", "id", "value" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
CREATE TABLE "new_Output" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" REAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dashboardId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Output_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Output_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "OutputCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Output" ("categoryId", "dashboardId", "date", "description", "id", "value") SELECT "categoryId", "dashboardId", "date", "description", "id", "value" FROM "Output";
DROP TABLE "Output";
ALTER TABLE "new_Output" RENAME TO "Output";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
