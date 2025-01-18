-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TorrentFiles" (
    "torrent_file_id" TEXT NOT NULL PRIMARY KEY,
    "torrent_id" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TorrentFiles_torrent_id_fkey" FOREIGN KEY ("torrent_id") REFERENCES "Torrents" ("torrent_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TorrentFiles" ("file", "torrent_file_id", "torrent_id") SELECT "file", "torrent_file_id", "torrent_id" FROM "TorrentFiles";
DROP TABLE "TorrentFiles";
ALTER TABLE "new_TorrentFiles" RENAME TO "TorrentFiles";
CREATE UNIQUE INDEX "TorrentFiles_torrent_file_id_key" ON "TorrentFiles"("torrent_file_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
