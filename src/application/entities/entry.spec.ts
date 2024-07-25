import { describe, expect, it } from "vitest";
import { User } from './user'
import { Dashboard } from './dashboard'
import { EntryCategory } from "./entry-category";
import { Entry } from './entry'

describe('Entry', () => {
  it('should be able to create a entry', () => {
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

    const entryCategory = new EntryCategory({
      title: 'Work',
      color: '#000',
    })

    const entry = new Entry({
      title: 'Paycheck',
      value: 4000,
      dashboardId: dashboard.id,
      categoryId: entryCategory.id,
    })

    expect(entry).toBeInstanceOf(Entry)
  })
})