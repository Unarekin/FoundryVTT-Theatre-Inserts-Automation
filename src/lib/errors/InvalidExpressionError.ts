import { LocalizedError } from "./LocalizedError";

export class InvalidExpressionError extends LocalizedError {
  constructor(expression: string) {
    super("INVALIDEXPRESSION", { expression });
  }
}