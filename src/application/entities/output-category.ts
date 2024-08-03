import { randomUUID } from "crypto";
import { Replace } from "../../helpers/Replace";

interface OutputCategoryProps {
  id: string;
  title: string;
  color: string;
  dashboardId: string;
}

type OutputCategoryPropsBody = Replace<OutputCategoryProps, {
  id?: string;
}>

export class OutputCategory {
  private props: OutputCategoryProps

  constructor(props: OutputCategoryPropsBody) {
    this.props = {
      id: props.id ?? randomUUID(),
      ...props,
    }
  }

  get id(): string {
    return this.props.id
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

  get color(): string {
    return this.props.color
  }

  set color(color: string) {
    this.props.color = color
  }
}