/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { coerceActor, coerceInsert } from "./coercion";
import { TWEEN_WAIT_TIME } from "./constants";
import { wait } from "./misc";
import { stageActor } from "./staging";
import { InvalidActorError } from "./errors";
import { ActorInsert } from "./interfaces";

/**
 * Activates an {@link Actor}'s insert
 * @param {string} id 
 */
export function activateActor(id: string): Promise<void>
/**
 * Activates an {@link Actor}'s insert
 * @param {string} name 
 */
export function activateActor(name: string): Promise<void>
/**
 * Activates an {@link Actor}'s insert
 * @param {Actor} actor {@link Actor}
 */
export function activateActor(actor: Actor): Promise<void>
/**
 * Activates a {@link Token}'s {@link Actor}'s insert
 * @param {Token} token {@link Token}
 */
export function activateActor(token: Token): Promise<void>
/**
 * Activates an {@link ActorInsert}
 * @param {ActorInsert} insert {@link ActorInsert}
 */
export function activateActor(insert: ActorInsert): Promise<void>
export function activateActor(arg: unknown): Promise<void> {
  let insert = coerceInsert(arg);
  if (!insert) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    stageActor(actor);
    insert = coerceInsert(arg);
  }

  if (!insert) throw new InvalidActorError();
  console.log("Activating:", insert);
  const navItem = theatre.getNavItemById(insert.imgId);
  theatre.handleNavItemMouseUp({
    currentTarget: navItem,
    button: 0
  });

  return wait(TWEEN_WAIT_TIME);
}


export function deactivateActor(id: string): void
export function deactivateActor(name: string): void
export function deactivateActor(actor: Actor): void
export function deactivateActor(token: Token): void
export function deactivateActor(insert: ActorInsert): void
export function deactivateActor(arg: unknown): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  if (!isActorActive(<any>arg)) return;

  let insert = coerceInsert(arg);
  if (!insert) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new InvalidActorError();
    insert = coerceInsert(actor);
  }

  if (!insert) throw new InvalidActorError();

  theatre.removeInsertById(insert.imgId, false);
}

/**
 * Determines if an {@link Actor}'s {@link ActorInsert} is active.
 * @param {string} id 
 */
export function isActorActive(id: string): boolean
/**
 * Determines if an {@link Actor}'s {@link ActorInsert} is active.
 * @param {string} name 
 */
export function isActorActive(name: string): boolean
/**
 * Determines if an {@link Actor}'s {@link ActorInsert} is active.
 * @param {Actor} actor {@link Actor}
 */
export function isActorActive(actor: Actor): boolean
/**
 * Determines if a {@link Token}'s {@link Actor}'s {@link ActorInsert} is active.
 * @param {Token} token {@link Token}
 */
export function isActorActive(token: Token): boolean
/**
 * Determines if an {@link ActorInsert} is active.
 * @param {ActorInsert} insert {@link ActorInsert}
 */
export function isActorActive(insert: ActorInsert): boolean
export function isActorActive(arg: unknown): boolean {
  const insert = coerceInsert(arg);
  if (!insert) throw new InvalidActorError();
  const navItem: HTMLElement = theatre.getNavItemById(insert.imgId);
  return navItem?.classList.contains("theatre-control-nav-bar-item-active");
}


/**
 * Returns the {@link ActorInsert} that is currently speaking, if any.
 * @returns {ActorInsert | null} {@link ActorInsert}
 */
export function currentlySpeaking(): ActorInsert | null {
  if (theatre.speakingAs) {
    const [, id] = (<string>theatre.speakingAs).split("-");
    const insert = coerceInsert(id);
    return insert ?? null;
  } else {
    return null;
  }
}

/**
 * Retrieves a list of {@link ActorInsert}s whose inserts are active.
 * @returns {ActorInsert[]} {@link ActorInsert}[]
 */
export function currentlyActive(): ActorInsert[] {
  return theatre.portraitDocks as ActorInsert[];
}