import { LocalizedError } from "./LocalizedError";

export class InvalidFontSizeError extends LocalizedError {
  constructor(size: number) {
    super("INVALIDSIZE", { size });
  }
}