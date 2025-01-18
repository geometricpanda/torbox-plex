import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string;
      HOSTNAME: string;
      NODE_ENV: string;
    };
  }
}
