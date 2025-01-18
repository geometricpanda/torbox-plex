import { FastifyPluginAsync } from 'fastify';

import { WebhookPluginOpts } from './interface';
import { radarWebhookPlugin } from './radarr';

export const webhooksPlugin: FastifyPluginAsync<WebhookPluginOpts> = async (
  fastify
) => {
  fastify.register(radarWebhookPlugin, { prefix: '/radarr' });
};
