import { OutputCategory } from "../../entities/output-category";
import { OutputCategoriesRepository } from "../output-categories-repository";

export class InMemoryOutputCategoriesRepository implements OutputCategoriesRepository {
  public items: OutputCategory[] = []

  async create(outputCategory: OutputCategory): Promise<void> {
    this.items.push(outputCategory)
  }

  async list(dashboardId: string): Promise<OutputCategory[]> {
    const items = this.items.filter((outputCategory) => outputCategory.dashboardId === dashboardId)
    // LIST BY ALPHABETICAL ORDER
    return items.sort((a, b) => a.title.localeCompare(b.title))
  }

  async search(titleToSearch: string): Promise<OutputCategory[]> {
    return this.items.filter((category) => category.title.includes(titleToSearch))
  }

  async find(id: string): Promise<OutputCategory | undefined> {
    return this.items.find((category) => category.id === id)
  }

  async save(user: OutputCategory): Promise<void> {
    const index = this.items.indexOf(user)
    if (index !== -1) {
      this.items[index] = user
    }
  }

  async delete(outputCategoryId: OutputCategory["id"]): Promise<void> {
    const categories = this.items.filter((category) => category.id !== outputCategoryId)
    this.items = categories
  }
}