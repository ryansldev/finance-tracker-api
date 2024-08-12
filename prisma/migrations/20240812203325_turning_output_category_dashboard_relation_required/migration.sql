/*
  Warnings:

  - Made the column `dashboardId` on table `OutputCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OutputCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "dashboardId" TEXT NOT NULL,
    CONSTRAINT "OutputCategory_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OutputCategory" ("color", "dashboardId", "id", "title") SELECT "color", "dashboardId", "id", "title" FROM "OutputCategory";
DROP TABLE "OutputCategory";
ALTER TABLE "new_OutputCategory" RENAME TO "OutputCategory";
CREATE UNIQUE INDEX "OutputCategory_title_key" ON "OutputCategory"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
