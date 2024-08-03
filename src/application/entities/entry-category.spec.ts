import { describe, expect, it } from 'vitest'
import { EntryCategory } from './entry-category'
import { Dashboard } from './dashboard'
import { User } from './user'

describe('Entry Category', () => {
  it('should be able to create a entry category', () => {
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
    const entryCategory = new EntryCategory({
      title: 'Work',
      color: '#000',
      dashboardId: dashboard.id,
    })

    expect(entryCategory).toBeInstanceOf(EntryCategory)
  })
})
