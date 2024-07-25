import { describe, expect, it } from "vitest";
import { User } from './user'
import { Dashboard } from './dashboard'
import { OutputCategory } from "./output-category";
import { Output } from './output'

describe('Output', () => {
  it('should be able to create a output', () => {
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

    const outputCategory = new OutputCategory({
      title: 'Transport',
      color: '#000',
    })

    const output = new Output({
      title: 'Passport',
      value: 500,
      dashboardId: dashboard.id,
      categoryId: outputCategory.id,
    })

    expect(output).toBeInstanceOf(Output)
  })
})