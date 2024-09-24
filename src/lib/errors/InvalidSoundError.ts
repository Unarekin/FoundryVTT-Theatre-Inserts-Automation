import { LocalizedError } from "./LocalizedError";

export class InvalidSoundError extends LocalizedError {
  constructor() {
    super("INVALIDSOUND");
  }
}