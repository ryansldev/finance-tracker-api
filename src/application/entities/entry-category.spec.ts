import { describe, expect, it } from 'vitest'
import { EntryCategory } from './entry-category'

describe('Entry Category', () => {
  it('should be able to create a entry category', () => {
    const entryCategory = new EntryCategory({
      title: 'Transport',
      color: '#000',
    })

    expect(entryCategory).toBeInstanceOf(EntryCategory)
  })
})
