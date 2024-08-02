import { randomUUID } from 'crypto';
import { Replace } from '../../helpers/Replace'
import { User } from './user';

interface DashboardProps {
  id: string;
  title: string;
  description?: string;
  authorId: User["id"];
  createdAt: Date;
  updatedAt?: Date;
}

type DashboardPropsBody = Replace<DashboardProps, {
  id?: string;
  createdAt?: Date;
}>

export class Dashboard {
  private props: DashboardProps

  constructor(props: DashboardPropsBody) {
    this.props = {
      id: props.id ?? randomUUID(),
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt,
    };
  }

  get id(): string {
    return this.props.id;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  get title(): string {
    return this.props.title;
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

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }
}