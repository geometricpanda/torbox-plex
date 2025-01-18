-- CreateTable
CREATE TABLE "TorrentFiles" (
    "torrent_file_id" TEXT NOT NULL PRIMARY KEY,
    "torrent_id" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    CONSTRAINT "TorrentFiles_torrent_id_fkey" FOREIGN KEY ("torrent_id") REFERENCES "Torrents" ("torrent_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TorrentFiles_torrent_file_id_key" ON "TorrentFiles"("torrent_file_id");
