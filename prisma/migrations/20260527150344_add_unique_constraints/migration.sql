/*
  Warnings:

  - A unique constraint covering the columns `[path,section]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Image_path_section_key" ON "Image"("path", "section");
