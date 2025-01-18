-- CreateTable
CREATE TABLE "Grabs" (
    "grab_id" TEXT NOT NULL PRIMARY KEY,
    "arr" TEXT NOT NULL,
    "arr_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "folder_path" TEXT NOT NULL,
    "release_title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Torrents" (
    "torrent_id" TEXT NOT NULL PRIMARY KEY,
    "file" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "torbox_id" INTEGER,
    "torbox_hash" TEXT,
    "torbox_auth_id" TEXT,
    "grab_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Torrents_grab_id_fkey" FOREIGN KEY ("grab_id") REFERENCES "Grabs" ("grab_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Grabs_grab_id_key" ON "Grabs"("grab_id");

-- CreateIndex
CREATE UNIQUE INDEX "Torrents_torrent_id_key" ON "Torrents"("torrent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Torrents_path_key" ON "Torrents"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Torrents_grab_id_key" ON "Torrents"("grab_id");
