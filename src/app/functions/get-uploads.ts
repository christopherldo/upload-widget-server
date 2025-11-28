import { asc, count, desc, type InferSelectModel, ilike } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'

const getUploadsInput = z.object({
  searchQuery: z.string().optional(),
  sortBy: z.enum(['createdAt']).optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(20),
})

type GetUploadsInput = z.input<typeof getUploadsInput>

const takenUploadColumns = {
  id: schema.uploads.id,
  name: schema.uploads.name,
  remoteKey: schema.uploads.remoteKey,
  remoteUrl: schema.uploads.remoteUrl,
  createdAt: schema.uploads.createdAt,
}

type TakenUploadColumnsKeys = keyof typeof takenUploadColumns
type GetUploadsOutput = {
  uploads: Pick<
    InferSelectModel<typeof schema.uploads>,
    TakenUploadColumnsKeys
  >[]
  total: number
}

export async function getUploads(
  input: GetUploadsInput
): Promise<Either<never, GetUploadsOutput>> {
  const { page, pageSize, searchQuery, sortBy, sortDirection } =
    getUploadsInput.parse(input)

  const whereClause = searchQuery
    ? ilike(schema.uploads.name, `%${searchQuery}%`)
    : undefined

  const [uploads, [{ total }]] = await Promise.all([
    db
      .select(takenUploadColumns)
      .from(schema.uploads)
      .where(whereClause)
      .orderBy(fields => {
        if (sortBy && sortDirection === 'asc') return asc(fields[sortBy])
        if (sortBy && sortDirection === 'desc') return desc(fields[sortBy])

        return desc(fields.id)
      })
      .offset((page - 1) * pageSize)
      .limit(pageSize),
    db
      .select({
        total: count(schema.uploads.id),
      })
      .from(schema.uploads)
      .where(whereClause),
  ])

  return makeRight({ uploads, total })
}
