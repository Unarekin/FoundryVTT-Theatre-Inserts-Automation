import { LocalizedError } from "./LocalizedError";

export class InvalidPlaylistError extends LocalizedError {
  constructor() {
    super("INVALIDPLAYLIST");
  }
}