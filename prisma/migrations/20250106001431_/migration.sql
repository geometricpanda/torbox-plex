-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Torrents" (
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
    "torrent_info_errors" INTEGER NOT NULL DEFAULT 0,
    "torrent_info_last_error" DATETIME,
    CONSTRAINT "Torrents_grab_id_fkey" FOREIGN KEY ("grab_id") REFERENCES "Grabs" ("grab_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Torrents" ("created_at", "file", "grab_id", "path", "torbox_auth_id", "torbox_hash", "torbox_id", "torrent_id", "type", "updated_at") SELECT "created_at", "file", "grab_id", "path", "torbox_auth_id", "torbox_hash", "torbox_id", "torrent_id", "type", "updated_at" FROM "Torrents";
DROP TABLE "Torrents";
ALTER TABLE "new_Torrents" RENAME TO "Torrents";
CREATE UNIQUE INDEX "Torrents_torrent_id_key" ON "Torrents"("torrent_id");
CREATE UNIQUE INDEX "Torrents_path_key" ON "Torrents"("path");
CREATE UNIQUE INDEX "Torrents_grab_id_key" ON "Torrents"("grab_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
