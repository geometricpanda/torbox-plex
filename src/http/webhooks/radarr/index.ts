import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { radarrWebhookErrorHandler } from './error';
import { notifyMovieAddedEvent } from './events/movie-added';
import { radarrGrab } from './events/radarr-grab';
import { notifyTestEvent } from './events/test-event';
import { RadarrEventType } from './interface';
import { RadarrEvent, RadarrEventSchema } from './schema';

export type RadarrWebhookRequest = FastifyRequest<{ Body: RadarrEvent }>;

export const webhookHandler = async (
  { body }: RadarrWebhookRequest,
  reply: FastifyReply
) => {
  if (body.eventType === RadarrEventType.Grab) {
    return radarrGrab(body).catch(radarrWebhookErrorHandler(reply));
  }

  if (body.eventType === RadarrEventType.MovieAdded) {
    return notifyMovieAddedEvent(body).catch(radarrWebhookErrorHandler(reply));
  }

  if (body.eventType === RadarrEventType.Test) {
    return notifyTestEvent(body).catch(radarrWebhookErrorHandler(reply));
  }

  return reply
    .status(400)
    .send({ error: true, detail: { message: 'Invalid event type' } });
};

export const radarWebhookPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.withTypeProvider<ZodTypeProvider>().post('/', {
    handler: webhookHandler,
    schema: { body: RadarrEventSchema },
  });
};
