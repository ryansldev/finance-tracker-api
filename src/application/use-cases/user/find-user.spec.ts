import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { CreateUser } from './create-user';
import { FindUser } from './find-user';
import { User } from '../../entities/user';
import { UserNotFound } from './errors/UserNotFound';

describe('Find User', () => {
  it('should be able to find a user that already exists', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)
    const sut = new FindUser(usersRepository)

    const user = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123'
    })

    expect(sut.execute({ id: user.id })).resolves.toBeInstanceOf(User)
  })

  it('should not be able to find a user that not exists', () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new FindUser(usersRepository)

    expect(sut.execute({ id: '1' })).rejects.toBeInstanceOf(UserNotFound)
  })
})
