import { randomUUID } from "crypto";
import { Replace } from "../../helpers/Replace";

interface EntryProps {
  id: string;
  title: string;
  description?: string;
  value: number;
  date: Date;
  categoryId: string;
  dashboardId: string;
}

type EntryPropsBody = Replace<EntryProps, {
  id?: string;
  date?: Date;
}>

export class Entry {
  private props: EntryProps

  constructor(props: EntryPropsBody) {
    this.props = {
      id: props.id ?? randomUUID(),
      ...props,
      date: props.date ?? new Date(),
    }
  }

  get id(): string {
    return this.props.id
  }

  get categoryId(): string {
    return this.props.categoryId
  }

  get dashboardId(): string {
    return this.props.dashboardId
  }

  get title(): string {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
  }

  get description(): string | undefined {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get value(): number {
    return this.props.value
  }

  set value(value: number) {
    this.props.value = value
  }

  get date(): Date {
    return this.props.date
  }

  set date(date: Date) {
    this.props.date = date
  }
}