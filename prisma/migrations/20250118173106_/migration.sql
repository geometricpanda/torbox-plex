-- CreateTable
CREATE TABLE "Grabs" (
    "grab_id" TEXT NOT NULL,
    "arr" TEXT NOT NULL,
    "arr_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "folder_path" TEXT NOT NULL,
    "release_title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Grabs_pkey" PRIMARY KEY ("grab_id")
);

-- CreateTable
CREATE TABLE "Torrents" (
    "torrent_id" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "torbox_id" INTEGER,
    "torbox_hash" TEXT,
    "torbox_auth_id" TEXT,
    "grab_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "torrent_info_errors" INTEGER NOT NULL DEFAULT 0,
    "torrent_info_last_error" TIMESTAMP(3),

    CONSTRAINT "Torrents_pkey" PRIMARY KEY ("torrent_id")
);

-- CreateTable
CREATE TABLE "TorrentFiles" (
    "torrent_file_id" TEXT NOT NULL,
    "torrent_id" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TorrentFiles_pkey" PRIMARY KEY ("torrent_file_id")
);

-- CreateTable
CREATE TABLE "HttpRequest" (
    "request_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "headers" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HttpRequest_pkey" PRIMARY KEY ("request_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Grabs_grab_id_key" ON "Grabs"("grab_id");

-- CreateIndex
CREATE UNIQUE INDEX "Torrents_torrent_id_key" ON "Torrents"("torrent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Torrents_path_key" ON "Torrents"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Torrents_grab_id_key" ON "Torrents"("grab_id");

-- CreateIndex
CREATE UNIQUE INDEX "TorrentFiles_torrent_file_id_key" ON "TorrentFiles"("torrent_file_id");

-- CreateIndex
CREATE UNIQUE INDEX "HttpRequest_request_id_key" ON "HttpRequest"("request_id");

-- AddForeignKey
ALTER TABLE "Torrents" ADD CONSTRAINT "Torrents_grab_id_fkey" FOREIGN KEY ("grab_id") REFERENCES "Grabs"("grab_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TorrentFiles" ADD CONSTRAINT "TorrentFiles_torrent_id_fkey" FOREIGN KEY ("torrent_id") REFERENCES "Torrents"("torrent_id") ON DELETE RESTRICT ON UPDATE CASCADE;
