import { randomUUID } from 'crypto'
import bcrypt from 'bcrypt'
import { Replace } from '../../helpers/Replace'
import { BadRequestError } from '../exceptions/api-errors'

interface UserProps {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserPropsBody = Replace<UserProps, {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}>

export class User {
  private props: UserProps;

  constructor(props: UserPropsBody) {
    props.id = props.id ?? randomUUID()
    props.createdAt = props.createdAt ?? new Date()
    props.updatedAt = props.updatedAt ?? new Date()
    if(props.updatedAt && props.updatedAt > props.createdAt) {
      throw new BadRequestError("Invalid update date")
    }

    this.props = {
      id: props.id,
      ...props,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }

  async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10)
    this.props.password = hash
  }

  async isPasswordMatching(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }

  get id(): string {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get lastname(): string {
    return this.props.lastname
  }

  set lastname(lastname: string) {
    this.props.lastname = lastname
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password(): string {
    return this.props.password
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }
}