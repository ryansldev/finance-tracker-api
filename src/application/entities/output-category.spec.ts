import { describe, expect, it } from 'vitest'
import { OutputCategory } from './output-category'

describe('Output Category', () => {
  it('should be able to create a output category', () => {
    const outputCategory = new OutputCategory({
      title: 'Transport',
      color: '#000',
    })

    expect(outputCategory).toBeInstanceOf(OutputCategory)
  })
})
