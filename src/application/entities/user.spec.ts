import { describe, expect, it } from 'vitest'
import { User } from './user'

describe('User', () => {
  it('should be able to create a user', () => {
    const user = new User({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123',
    })

    expect(user).toBeInstanceOf(User)
  })

  it('should be able to create a user and hash password', async () => {
    const user = new User({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123',
    })
    
    await user.hashPassword()

    expect(user.password).not.toBe('johndoe123')
  })

  it('should not be able to create a user with invalid dates', () => {
    expect(() => {
      const updatedAt = new Date()
      updatedAt.setHours(updatedAt.getHours() + 2)
      new User({
        name: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'johndoe123',
        createdAt: new Date(),
        updatedAt,
      })
    }).toThrow()
  })
})