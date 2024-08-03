import { describe, expect, it } from 'vitest'
import { OutputCategory } from './output-category'
import { User } from './user'
import { Dashboard } from './dashboard'

describe('Output Category', () => {
  it('should be able to create a output category', () => {
    const user = new User({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123'
    })

    const dashboard = new Dashboard({
      title: 'Personal Finances',
      authorId: user.id,
    })

    const outputCategory = new OutputCategory({
      title: 'Transport',
      color: '#000',
      dashboardId: dashboard.id,
    })

    expect(outputCategory).toBeInstanceOf(OutputCategory)
  })
})
