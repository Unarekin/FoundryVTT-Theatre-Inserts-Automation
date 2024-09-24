import { LocalizedError } from "./LocalizedError";

export class ActorNotStagedError extends LocalizedError {
  constructor() {
    super("ACTORNOTSTAGED");
  }
}