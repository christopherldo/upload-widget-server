import { randomUUID } from 'node:crypto'
import { describe, it } from 'vitest'
import { makeUpload } from '@/test/factories/make-upload'
import { exportUploads } from './export-uploads'

describe('get uploads', () => {
  it('should be able to export uploads', async () => {
    const namePattern = randomUUID()

    await makeUpload({ name: `${namePattern}.webp` })
    await makeUpload({ name: `${namePattern}.webp` })
    await makeUpload({ name: `${namePattern}.webp` })
    await makeUpload({ name: `${namePattern}.webp` })
    await makeUpload({ name: `${namePattern}.webp` })

    await exportUploads({
      searchQuery: namePattern,
    })
  })
})
