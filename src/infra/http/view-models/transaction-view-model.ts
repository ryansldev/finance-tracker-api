import { Entry } from "../../../application/entities/entry"
import { Output } from "../../../application/entities/output"

type Transaction = Entry | Output

interface TransactionHTTP {
  title: string;
  value: number;
  date: Date;
}

export class TransactionViewModel {
  static toHTTP(transaction: Transaction): TransactionHTTP {
    return {
      title: transaction.title,
      value: transaction.value,
      date: transaction.date,
    }
  }
}