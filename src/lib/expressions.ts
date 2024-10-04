import { coerceActor } from "./coercion";
import { InvalidActorError, InvalidExpressionError } from "./errors";
import { getBaseImage, setImage } from "./image";

/**
 * Configures an {@link Actor}'s expression and associated image
 * @param {string} id {@link Actor} id
 * @param {string} expression 
 * @param {string} url 
 */
export function setExpression(id: string, expression: string, url: string): Promise<void>
/**
 * Configures an {@link Actor}'s expression and associated image
 * @param {string} name 
 * @param {string} expression 
 * @param {string} url 
 */
export function setExpression(name: string, expression: string, url: string): Promise<void>
/**
 * Configures an {@link Actor}'s expression and associated image
 * @param {Actor} actor {@link Actor}
 * @param {string} expression 
 * @param {string} url 
 */
export function setExpression(actor: Actor, expression: string, url: string): Promise<void>
/**
 * Configures an {@link Actor}'s expression and associated image
 * @param {Token} token {@link Token}
 * @param {string} expression 
 * @param {string} url 
 */
export function setExpression(token: Token, expression: string, url: string): Promise<void>
export function setExpression(arg: unknown, expression: string, url: string): Promise<void> {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();

  if (!url) {
    // Remove
    return actor.unsetFlag(__MODULE_ID__, `expressions.${expression}`).then(() => { });
  } else {
    // Upsert
    return actor.setFlag(__MODULE_ID__, `expressions`, Object.fromEntries([[expression, url]])).then(() => { });
  }
}

/**
 * Retrieves an {@link Actor}'s configured expression by name, if it exists.
 * @param {string} id 
 * @param {string} expression 
 */
export function getExpression(id: string, expression: string): string
/**
 * Retrieves an {@link Actor}'s configured expression by name, if it exists.
 * @param {string} name 
 * @param {string} expression 
 */
export function getExpression(name: string, expression: string): string
/**
 * Retrieves an {@link Actor}'s configured expression by name, if it exists.
 * @param {Actor} actor {@link Actor}
 * @param {string} expression 
 */
export function getExpression(actor: Actor, expression: string): string
/**
 * Retrieves an {@link Actor}'s configured expression by name, if it exists.
 * @param {Token} token {@link Token}
 * @param {string} expression 
 */
export function getExpression(token: Token, expression: string): string
export function getExpression(arg: unknown, expression: string): string {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();

  return (actor.getFlag(__MODULE_ID__, `expressions.${expression}`) as string) || "";
}

/**
 * Retrieves a hash of all configured expressions for a given {@link Actor}
 * @param {string} id 
 * @returns {object} A hash whose keys are names of the expression, and values are the URL to its image.
 */
export function getExpressions(id: string): { [x: string]: string }
/**
 * Retrieves a hash of all configured expressions for a given {@link Actor}
 * @param {string} name 
 * @returns {object} A hash whose keys are names of the expression, and values are the URL to its image.
 */
export function getExpressions(name: string): { [x: string]: string }
/**
 * Retrieves a hash of all configured expressions for a given {@link Actor}
 * @param {Actor} actor {@link Actor}
 * @returns {object} A hash whose keys are names of the expression, and values are the URL to its image.
 */
export function getExpressions(actor: Actor): { [x: string]: string }
/**
 * Retrieves a hash of all configured expressions for a given {@link Actor}
 * @param {Token} token {@link Token}
 * @returns {object} A hash whose keys are names of the expression, and values are the URL to its image.
 */
export function getExpressions(token: Token): { [x: string]: string }
export function getExpressions(arg: unknown): { [x: string]: string } {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  return (actor.getFlag(__MODULE_ID__, "expressions") as { [x: string]: string }) ?? {};
}

/**
 * Returns whether or not an {@link Actor} has a given expression configured.
 * @param {string} id 
 * @param {string} expression 
 */
export function hasExpression(id: string, expression: string): boolean
/**
 * Returns whether or not an {@link Actor} has a given expression configured.
 * @param {string} name 
 * @param {string} expression 
 */
export function hasExpression(name: string, expression: string): boolean
/**
 * Returns whether or not an {@link Actor} has a given expression configured.
 * @param {Actor} actor {@link Actor}
 * @param {string} expression 
 */
export function hasExpression(actor: Actor, expression: string): boolean
/**
 * Returns whether or not an {@link Actor} has a given expression configured.
 * @param {Token} token {@link Token}
 * @param expression 
 */
export function hasExpression(token: Token, expression: string): boolean
export function hasExpression(arg: unknown, expression: string): boolean {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  const expressions = getExpressions(actor);
  return Object.keys(expressions).includes(expression);
}

/**
 * Swaps an {@link Actor}'s image for the one configured for a given expression
 * @param {string} id 
 * @param {string} expression 
 */
export function activateExpression(id: string, expression: string): Promise<void>
/**
 * Swaps an {@link Actor}'s image for the one configured for a given expression
 * @param {string} name 
 * @param {string} expression 
 */
export function activateExpression(name: string, expression: string): Promise<void>
/**
 * Swaps an {@link Actor}'s image for the one configured for a given expression
 * @param {Actor} actor {@link Actor}
 * @param {string} expression 
 */
export function activateExpression(actor: Actor, expression: string): Promise<void>
/**
 * Swaps an {@link Actor}'s image for the one configured for a given expression
 * @param {Token} token {@link Token}
 * @param {string} expression 
 */
export function activateExpression(token: Token, expression: string): Promise<void>
export function activateExpression(arg: unknown, expression: string): Promise<void> {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const url: string | undefined = (actor.getFlag(__MODULE_ID__, "expressions"))[expression];
  if (!url) throw new InvalidExpressionError(expression);

  return setImage(actor, url);
}

/**
 * Clears an {@link Actor}'s expression, returning it to base
 * @param {string} id 
 */
export function clearExpression(id: string): Promise<void>
/**
 * Clears an {@link Actor}'s expression, returning it to base
 * @param {string} name 
 */
export function clearExpression(name: string): Promise<void>
/**
 * Clears an {@link Actor}'s expression, returning it to base
 * @param {Actor} actor {@link Actor}
 */
export function clearExpression(actor: Actor): Promise<void>
/**
 * Clears an {@link Actor}'s expression, returning it to base
 * @param {Token} token {@link Token}
 */
export function clearExpression(token: Token): Promise<void>
export function clearExpression(arg: unknown): Promise<void> {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  return setImage(actor, getBaseImage(actor));
}