import { ilike } from 'drizzle-orm'
import z from 'zod'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'

const exportUploadsInput = z.object({
  searchQuery: z.string().optional(),
})

type ExportUploadsInput = z.input<typeof exportUploadsInput>

const takenUploadColumns = {
  id: schema.uploads.id,
  name: schema.uploads.name,
  remoteUrl: schema.uploads.remoteUrl,
  createdAt: schema.uploads.createdAt,
}

type ExportUploadsOutput = {
  reportUrl: string
}

export async function exportUploads(
  input: ExportUploadsInput
): Promise<Either<never, ExportUploadsOutput>> {
  const { searchQuery } = exportUploadsInput.parse(input)

  const whereClause = searchQuery
    ? ilike(schema.uploads.name, `%${searchQuery}%`)
    : undefined

  const { sql, params } = db
    .select(takenUploadColumns)
    .from(schema.uploads)
    .where(whereClause)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(2)

  for await (const rows of cursor) {
    console.log(rows)
  }

  return makeRight({ reportUrl: '' })
}
