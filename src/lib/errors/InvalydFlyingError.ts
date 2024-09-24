import { LocalizedError } from "./LocalizedError";

export class InvalidFlyinError extends LocalizedError {
  constructor(flyin: string) {
    super("INVALIDFLYIN", { flyin });
  }
}