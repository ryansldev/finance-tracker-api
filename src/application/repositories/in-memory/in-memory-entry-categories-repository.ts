import { EntryCategory } from "../../entities/entry-category";
import { EntryCategoriesRepository } from "../entry-categories-repository";

export class InMemoryEntryCategoriesRepository implements EntryCategoriesRepository {
  public items: EntryCategory[] = []

  async create(entryCategory: EntryCategory): Promise<void> {
    this.items.push(entryCategory)
  }

  async list(): Promise<EntryCategory[]> {
    // LIST BY ALPHABETICAL ORDER
    return this.items.sort((a, b) => a.title.localeCompare(b.title))
  }

  async search(dashboardId: string, titleToSearch: string): Promise<EntryCategory[]> {
    const entryCategoriesFromDashboard = this.items.filter((entryCategory) => entryCategory.dashboardId === dashboardId)
    return entryCategoriesFromDashboard.filter((category) => category.title.toLowerCase().includes(titleToSearch.toLowerCase()))
  }

  async findByTitle(title: string): Promise<EntryCategory | undefined> {
    return this.items.filter((category) => category.title === title)[0]
  }

  async find(id: string): Promise<EntryCategory | undefined> {
    return this.items.find((category) => category.id === id)
  }

  async save(user: EntryCategory): Promise<void> {
    const index = this.items.indexOf(user)
    if (index !== -1) {
      this.items[index] = user
    }
  }

  async delete(entryCategoryId: EntryCategory["id"]): Promise<void> {
    const categories = this.items.filter((category) => category.id !== entryCategoryId)
    this.items = categories
  }
}