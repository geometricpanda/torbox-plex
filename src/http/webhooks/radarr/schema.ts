import { z } from 'zod';

import { RadarrEventType } from './interface';

const RadarrBaseSchema = z.object({ eventType: z.string() });

export const RadarTestEventSchema = RadarrBaseSchema.extend({
  eventType: z.literal(RadarrEventType.Test),
});

export const RadarrMovieAddedEventSchema = RadarrBaseSchema.extend({
  eventType: z.literal(RadarrEventType.MovieAdded),
  movie: z.object({
    tmdbId: z.number().optional(),
    imdbId: z.string().optional(),
    id: z.number(),
    title: z.string(),
    year: z.number(),
    folderPath: z.string(),
    tags: z.array(z.string()),
    overview: z.string(),
    genres: z.array(z.string()),
    images: z.array(
      z.object({
        coverType: z.string(),
        url: z.string(),
        remoteUrl: z.string(),
      })
    ),
  }),
});

export const RadarrGrabEventSchema = RadarrBaseSchema.extend({
  movie: z.object({
    tmdbId: z.number().optional(),
    imdbId: z.string().optional(),
    id: z.number(),
    title: z.string(),
    year: z.number(),
    folderPath: z.string(),
    tags: z.array(z.string()),
  }),
  remoteMovie: z.object({
    tmdbId: z.number().optional(),
    imdbId: z.string().optional(),
    title: z.string(),
    year: z.number(),
  }),
  release: z.object({
    releaseTitle: z.string(),
  }),
  eventType: z.literal(RadarrEventType.Grab),
});

export const RadarrEventSchema = z.union([
  RadarTestEventSchema,
  RadarrGrabEventSchema,
  RadarrMovieAddedEventSchema,
]);

export type RadarrEvent = z.infer<typeof RadarrEventSchema>;

export type RadarrTestEvent = z.infer<typeof RadarTestEventSchema>;
export type RadarrMovieAddedEvent = z.infer<typeof RadarrMovieAddedEventSchema>;
export type RadarrGrabEvent = z.infer<typeof RadarrGrabEventSchema>;
