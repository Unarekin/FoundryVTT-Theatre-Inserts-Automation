import { LocalizedError } from "./LocalizedError";

export class InvalidFontError extends LocalizedError {
  constructor(font: string) {
    super("INVALIDFONT", { font });
  }
}