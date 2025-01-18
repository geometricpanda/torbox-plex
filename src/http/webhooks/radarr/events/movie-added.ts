import { RadarrMovieAddedEvent } from '../schema';

export const notifyMovieAddedEvent = async (body: RadarrMovieAddedEvent) => ({
  success: true,
  detail: {
    message: `Movie added: ${body.movie.title}`,
  },
});
