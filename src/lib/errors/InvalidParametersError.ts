import { LocalizedError } from "./LocalizedError";

export class InvalidParametersError extends LocalizedError {
  constructor() {
    super("INVALIDPARAMETERS");
  }
}