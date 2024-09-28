import { LocalizedError } from "./LocalizedError";

export class ActorNotActiveError extends LocalizedError {
  constructor() {
    super("ACTORNOTACTIVE");
  }
}