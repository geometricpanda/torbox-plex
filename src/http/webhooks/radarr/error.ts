import { FastifyReply } from 'fastify';

import { WebhookError } from '../error';

export const radarrWebhookErrorHandler =
  (reply: FastifyReply) => (error: Error | WebhookError) =>
    error instanceof WebhookError
      ? reply.status(422).send({
          error: true,
          detail: {
            name: error.name,
            message: error.message,
          },
        })
      : reply.status(500).send({
          error: true,
          detail: {
            name: 'Internal server error',
            message: error.message,
          },
        });
