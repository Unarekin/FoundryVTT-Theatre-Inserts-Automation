import { activateActor, isActorActive } from "./activation";
import { coerceActor } from "./coercion";
import { InvalidActorError } from "./errors";

/**
 * Returns the list of default emotes
 * @returns {string[]} string[]
 */
export function getEmoteNames(): string[] {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  return Object.values(Theatre.getDefaultEmotes()).map((val: any) => val.name);
}

/**
 * Retrieves a list of emote names and their associated image paths
 * @returns {{name: string, path: string}[]} {name: string, path: string}[]
 */
export function getEmotePaths(): { name: string, path: string }[] {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.entries(Theatre.getDefaultEmotes())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(([, value]: [string, any]) => ({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      name: value.name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      path: value.image
    }));
}

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

