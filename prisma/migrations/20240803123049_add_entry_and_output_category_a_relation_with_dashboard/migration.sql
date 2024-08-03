/*
  Warnings:

  - Added the required column `dashboardId` to the `EntryCategory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EntryCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "dashboardId" TEXT NOT NULL,
    CONSTRAINT "EntryCategory_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EntryCategory" ("color", "id", "title") SELECT "color", "id", "title" FROM "EntryCategory";
DROP TABLE "EntryCategory";
ALTER TABLE "new_EntryCategory" RENAME TO "EntryCategory";
CREATE UNIQUE INDEX "EntryCategory_title_key" ON "EntryCategory"("title");
CREATE TABLE "new_OutputCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "dashboardId" TEXT,
    CONSTRAINT "OutputCategory_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_OutputCategory" ("color", "id", "title") SELECT "color", "id", "title" FROM "OutputCategory";
DROP TABLE "OutputCategory";
ALTER TABLE "new_OutputCategory" RENAME TO "OutputCategory";
CREATE UNIQUE INDEX "OutputCategory_title_key" ON "OutputCategory"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
