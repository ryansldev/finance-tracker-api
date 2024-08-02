/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `EntryCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `OutputCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EntryCategory_title_key" ON "EntryCategory"("title");

-- CreateIndex
CREATE UNIQUE INDEX "OutputCategory_title_key" ON "OutputCategory"("title");
