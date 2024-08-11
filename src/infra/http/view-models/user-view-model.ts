import { User } from "../../../application/entities/user";

interface UserHTTP {
  id: string;
  name: string;
  lastname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserViewModel {
  static toHTTP(user: User): UserHTTP {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}