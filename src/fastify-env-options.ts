import { FastifyEnvOptions } from '@fastify/env';
import { config } from 'dotenv';

config();

export const fastifyEnvOptions: FastifyEnvOptions = {
  confKey: 'config',
  schema: {
    type: 'object',
    required: ['HOSTNAME', 'PORT', 'DATABASE_URL'],
    properties: {
      DATABASE_URL: {
        type: 'string',
      },
      HOSTNAME: {
        type: 'string',
        default: 'localhost',
      },
      PORT: {
        type: 'number',
        default: 3000,
      },
    },
  },
};
