import { randomUUID } from "crypto";
import { Replace } from "../../helpers/Replace";

interface OutputProps {
  id: string;
  title: string;
  description?: string;
  value: number;
  date: Date;
  categoryId: string;
  dashboardId: string;
}

type OutputPropsBody = Replace<OutputProps, {
  id?: string;
  date?: Date;
}>

export class Output {
  private props: OutputProps

  constructor(props: OutputPropsBody) {
    this.props = {
      id: props.id ?? randomUUID(),
      ...props,
      date: new Date(),
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