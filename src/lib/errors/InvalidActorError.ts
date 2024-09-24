import { LocalizedError } from "./LocalizedError";

export class InvalidActorError extends LocalizedError {
  constructor() {
    super("INVALIDACTOR");
  }
}