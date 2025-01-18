export interface RadarrHistoryData {
  age: string;
  ageHours: string;
  ageMinutes: string;
  customFormatScore: string;
  downloadClient: string;
  downloadClientName: string;
  downloadUrl: string;
  guid: string;
  imdbId: string;
  indexer: string;
  indexerFlags: string;
  indexerId: string;
  movieMatchType: string;
  nzbInfoUrl: string;
  protocol: string;
  publishedDate: string;
  releaseGroup: string;
  releaseSource: string;
  size: string;
  tmdbId: string;
  torrentInfoHash: string;
}

export interface RadarrMovieQuality {
  quality: {
    id: number;
    name: string;
    source: string;
    resolution: string;
    modifier: string;
  };
  revision: {
    version: number;
    real: number;
    isRepack: boolean;
  };
  qualityCutoffNotMet: boolean;
  sourceTitle: string;
}

export interface RadarrHistory {
  customFormatScore: number;
  customFormats: any[];
  data: RadarrHistoryData;
  date: string;
  eventType: string;
  id: number;
  languages: Array<{ id: number; name: string }>;
  movieId: number;
  quality: RadarrMovieQuality;
}
