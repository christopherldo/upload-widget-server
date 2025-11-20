import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { uploadImage } from '@/app/functions/upload-image'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/uploads',
    {
      schema: {
        summary: 'Upload an image',
        consumes: ['multipart/form-data'],
        response: {
          201: z.object({ uploadId: z.string() }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const uploadedFile = await request.file({
        limits: {
          fieldSize: 1024 * 1024 * 2, //2MB
        },
      })

      if (!uploadedFile) {
        return reply.status(400).send({ message: 'File is required.' })
      }

      await uploadImage({
        fileName: uploadedFile.filename,
        contentType: uploadedFile.mimetype,
        contentStream: uploadedFile.file,
      })

      return reply.status(201).send({ uploadId: 'teste' })
    }
  )
}
