import { LocalizedError } from "./LocalizedError";

export class NoChatHookError extends LocalizedError {
  constructor() {
    super("NOCHATHOOK");
  }
}