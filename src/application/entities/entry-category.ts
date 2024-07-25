import { randomUUID } from "crypto";
import { Replace } from "../../helpers/Replace";

interface EntryCategoryProps {
  id: string;
  title: string;
  color: string;
}

type EntryCategoryPropsBody = Replace<EntryCategoryProps, {
  id?: string;
}>

export class EntryCategory {
  private props: EntryCategoryProps

  constructor(props: EntryCategoryPropsBody) {
    this.props = {
      id: props.id ?? randomUUID(),
      ...props,
    }
  }

  get id(): string {
    return this.props.id
  }

  get title(): string {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
  }

  get color(): string {
    return this.props.color
  }

  set color(color: string) {
    this.props.color = color
  }
}