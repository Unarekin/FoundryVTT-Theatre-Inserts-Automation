import { activateActor, isActorActive } from "./activation";
import { coerceActor } from "./coercion";
import { InvalidActorError } from "./errors";

/**
 * Sets an emote on an {@link Actor}'s message
 * @param {string} id The {@link Actor}'s id
 * @param {string} emote 
 */
export function setEmote(id: string, emote: string): Promise<void>
/**
 * Sets an emote on an {@link Actor}'s message
 * @param {string} name The {@link Actor}'s name
 * @param {string} emote 
 */
export function setEmote(name: string, emote: string): Promise<void>
/**
 * Sets an emote on an {@link Actor}'s message
 * @param {Actor} actor The {@link Actor} object
 * @param emote 
 */
export function setEmote(actor: Actor, emote: string): Promise<void>
export function setEmote(arg: unknown, emote: string): Promise<void> {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  return doSetEmote(actor, emote);
}

async function doSetEmote(actor: Actor, emote: string): Promise<void> {
  if (!isActorActive(actor)) await activateActor(actor);
  theatre.setUserEmote(
    game.user?.id,
    `theatre-${actor.id}`,
    "emote",
    emote,
    false
  );
}

/**
 * Clears an emote from an {@link Actor}'s insert
 * @param {string} id ID of the {@link Actor}
 */
export function clearEmote(id: string): void
/**
 * Clears an emote from an {@link Actor}'s insert
 * @param {string} name Name of the {@link Actor}
 */
export function clearEmote(name: string): void
export function clearEmote(arg: unknown): void {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new InvalidActorError();
  theatre.setUserEmote(game.user?.id, `theatre-${actor.id}`, "emote", "", false);
}

