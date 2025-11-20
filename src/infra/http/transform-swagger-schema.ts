import { jsonSchemaTransform } from 'fastify-type-provider-zod'

type TransformSwaggerSchemaData = Parameters<typeof jsonSchemaTransform>[0]

interface SchemaBody {
  type: string
  required: string[]
  properties: Record<string, unknown>
}

export const transfromSwaggerSchema = (data: TransformSwaggerSchemaData) => {
  const { schema, url } = jsonSchemaTransform(data)

  if (schema.consumes?.includes('multipart/form-data')) {
    if (schema.body === undefined) {
      schema.body = {
        type: 'object',
        required: [],
        properties: {},
      }
    }

    const body = schema.body as SchemaBody

    body.properties.file = {
      type: 'string',
      format: 'binary',
    }

    body.required.push('file')
  }

  return { schema, url }
}
