import fastifyEnv from '@fastify/env';
import Fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { fastifyEnvOptions } from './fastify-env-options';
import { webhooksPlugin } from './http/webhooks';

const app = async () => {
  const fastify = Fastify({
    logger: {
      level: 'warn',
      transport: { target: 'pino-pretty' },
    },
  });

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);
  fastify.register(fastifyEnv, fastifyEnvOptions);
  fastify.register(webhooksPlugin, { prefix: '/webhooks' });

  // @ts-expect-error
  if (import.meta.env.PROD) {
    await fastify.ready();
    const { HOSTNAME, PORT } = fastify.config;
    fastify
      .listen({
        host: HOSTNAME,
        port: Number(PORT),
      })
      .catch((err) => {
        fastify.log.error(err);
        process.exit(1);
      });
  }

  return fastify;
};

export const viteNodeApp = app();
