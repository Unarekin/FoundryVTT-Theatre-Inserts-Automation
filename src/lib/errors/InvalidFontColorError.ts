import { LocalizedError } from "./LocalizedError";

export class InvalidFontColorError extends LocalizedError {
  constructor(color: string) {
    super("INVALIDCOLOR", { color });
  }
}