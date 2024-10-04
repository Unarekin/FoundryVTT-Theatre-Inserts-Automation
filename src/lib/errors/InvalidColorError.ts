import { LocalizedError } from "./LocalizedError";

export class InvalidColorError extends LocalizedError {
  constructor(color: string) {
    super("INVALIDCOLOR", { color });
  }
}