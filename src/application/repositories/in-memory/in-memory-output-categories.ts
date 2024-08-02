import { OutputCategory } from "../../entities/output-category";
import { OutputCategoriesRepository } from "../output-categories-repository";

export class InMemoryOutputCategoriesRepository implements OutputCategoriesRepository {
  public items: OutputCategory[] = []

  async create(outputCategory: OutputCategory): Promise<void> {
    this.items.push(outputCategory)
  }

  async list(): Promise<OutputCategory[]> {
    // LIST BY ALPHABETICAL ORDER
    return this.items.sort((a, b) => a.title.localeCompare(b.title))
  }

  async search(titleToSearch: string): Promise<OutputCategory[]> {
    return this.items.filter((category) => category.title.includes(titleToSearch))
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