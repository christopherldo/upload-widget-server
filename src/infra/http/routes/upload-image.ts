import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/uploads',
    {
      schema: {
        summary: 'Upload an image',
        body: z.object({
          name: z.string(),
          password: z.string().optional(),
        }),
        response: {
          201: z.object({ uploadId: z.string() }),
          409: z
            .object({ message: z.string() })
            .describe('Upload already exists.'),
        },
      },
    },
    async (_, reply) => {
      await db.insert(schema.uploads).values({
        name: 'teste.jpg',
        remoteKey: 'teste.jpg',
        remoteUrl: 'https://picsum.photos/500',
      })

      return reply.status(201).send({ uploadId: 'teste' })
    }
  )
}
