import { LocalizedError } from "./LocalizedError";

export class InvalidStandingError extends LocalizedError {
  constructor(standing: string) {
    super("INVALIDSTANDING", { standing });
  }
}