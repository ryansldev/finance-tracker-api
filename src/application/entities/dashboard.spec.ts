import { describe, expect, it } from 'vitest'
import { User } from './user'
import { Dashboard } from './dashboard'

describe('Dashboard', () => {
  it('should be able to create a dashboard', () => {
    const user = new User({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123'
    })

    const dashboard = new Dashboard({
      title: 'Dashboard',
      authorId: user.id,
    })

    expect(dashboard).toBeInstanceOf(Dashboard)
  })
})
