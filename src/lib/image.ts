import { isActorActive } from "./activation";
import { coerceActor } from "./coercion";
import { ActorNotActiveError, InvalidActorError, InvalidURLError } from "./errors";

/**
 * Retrieves the current image for an {@link Actor}'s insert.  If the insert is active, will retrieve the image directly from the actual insert, otherwise uses the actor's configuration.
 * @param {string} id 
 * @returns {string} Path to the image
 */
export function getImage(id: string): string
/**
 * Retrieves the current image for an {@link Actor}'s insert.  If the insert is active, will retrieve the image directly from the actual insert, otherwise uses the actor's configuration.
 * @param {string} name
 * @returns {string} Path to the image
 */
export function getImage(name: string): string
/**
 * Retrieves the current image for an {@link Actor}'s insert.  If the insert is active, will retrieve the image directly from the actual insert, otherwise uses the actor's configuration.
 * @param {Actor} {@link Actor}
 * @returns {string} Path to the image
 */
export function getImage(actor: Actor): string
/**
 * Retrieves the current image for an {@link Actor}'s insert.  If the insert is active, will retrieve the image directly from the actual insert, otherwise uses the actor's configuration.
 * @param {Token} token {@link Token}
 * @returns {string} Path to the image
 */
export function getImage(token: Token): string
export function getImage(arg: unknown): string {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();

  if (isActorActive(actor))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return theatre.getInsertById(`theatre-${actor.id}`)?.portrait.texture.textureCacheIds[1] as string;
  return getBaseImage(actor);
}

/**
 * Retrieves the base Theatre Insert image for a given {@link Actor}
 * @param {string} id 
 */
export function getBaseImage(id: string): string
/**
 * Retrieves the base Theatre Insert image for a given {@link Actor}
 * @param {string} name 
 */
export function getBaseImage(name: string): string
/**
 * Retrieves the base Theatre Insert image for a given {@link Actor}
 * @param {Actor} actor {@link Actor}
 */
export function getBaseImage(actor: Actor): string
/**
 * Retrieves the base Theatre Insert image for a given {@link Actor}
 * @param {Token} }token {@link Token}
 */
export function getBaseImage(token: Token): string
export function getBaseImage(arg: unknown): string {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  return ((<any>actor).flags?.theatre?.baseinsert || (<any>actor).img) as string;
}

/**
 * Sets the base Theatre Insert image for an {@link Actor}
 * @param {string} id 
 * @param {string} url 
 */
export function setBaseImage(id: string, url: string): Promise<void>
/**
 * Sets the base Theatre Insert image for an {@link Actor}
 * @param {string} name 
 * @param {string} url 
 */
export function setBaseImage(name: string, url: string): Promise<void>
/**
 * Sets the base Theatre Insert image for an {@link Actor}
 * @param {Actor} actor {@link Actor}
 * @param {string} url 
 */
export function setBaseImage(actor: Actor, url: string): Promise<void>
/**
 * Sets the base Theatre Insert image for an {@link Actor}
 * @param {Token} token {@link Token}
 * @param url 
 */
export function setBaseImage(token: Token, url: string): Promise<void>
export function setBaseImage(arg: unknown, url: string): Promise<void> {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  return actor.setFlag("theatre", "baseinsert", url).then(() => { });
}

/**
 * Sets the image for an {@link Actor}'s insert
 * @param {string} id 
 * @param {string} image 
 */
export function setImage(id: string, image: string): Promise<void>
/**
 * Sets the image for an {@link Actor}'s insert
 * @param {string} name 
 * @param {string} image 
 */
export function setImage(name: string, image: string): Promise<void>
/**
 * Sets the image for an {@link Actor}'s insert
 * @param {Actor} actor {@link Actor}
 * @param {string} image 
 */
export function setImage(actor: Actor, image: string): Promise<void>
/**
 * Sets the image for an {@link Actor}'s insert
 * @param {Token} token {@link Token}
 * @param {string} image 
 */
export function setImage(token: Token, image: string): Promise<void>
export function setImage(arg: unknown, image: string): Promise<void> {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  if (!isActorActive(actor)) throw new ActorNotActiveError();

  return srcExists(image)
    .then(val => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      if (val) return (<any>theatre)._AddTextureResource(image, image, `theatre-${actor.id}`, false);
      else throw new InvalidURLError(image);
    }).then(() => { });
}