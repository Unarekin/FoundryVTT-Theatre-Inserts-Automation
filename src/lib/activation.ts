/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { coerceActor } from "./coercion";
import { TWEEN_WAIT_TIME } from "./constants";
import { clearEmote } from "./emotes";
import { wait } from "./misc";
import { isActorStaged, stageActor } from "./staging";

/**
 * Handles staging and activating the insert for an {@link Actor}
 * @param {string} id ID of the {@link Actor}
 */
export function activateActor(id: string): Promise<void>
/**
 * Handles staging and activating the insert for an {@link Actor}
 * @param {string} name Name of the {@link Actor}
 */
export function activateActor(name: string): Promise<void>
/**
 * Handles staging and activating the insert for an {@link Actor}
 * @param {Actor} actor {@link Actor} to activate.
 */
export function activateActor(actor: Actor): Promise<void>
export function activateActor(arg: unknown): Promise<void> {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  if (!isActorStaged(actor)) stageActor(actor);

  theatre.handleNavItemMouseUp({
    currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
    button: 2
  });

  return wait(TWEEN_WAIT_TIME);
}



/**
 * Handles deactivating and possibly unstaging an (@link Actor).
 * @param {string} id ID of the {@link Actor} to deactivate
 * @param {boolean} [unstage=false] Whether or not to remove the {@link Actor} from the Theatre Inserts stage
 */
export function deactivateActor(id: string, unstage?: boolean): Promise<void>
/**
 * Handles deactivating and possibly unstaging an (@link Actor).
 * @param {string} name Name of the {@link Actor} to deactivate
 * @param {boolean} [unstage=false] Whether or not to remove the {@link Actor} from the Theatre Inserts stage
 */
export function deactivateActor(name: string, unstage?: boolean): Promise<void>
/**
 * Handles deactivating and possibly unstaging an (@link Actor).
 * @param {Actor} actor The {@link Actor} object to deactivate.
 * @param {boolean} [unstage=false] Whether or not to remove the {@link Actor} from the Theatre Inserts stage
 */
export function deactivateActor(actor: Actor, unstage?: boolean): Promise<void>
export function deactivateActor(arg: unknown, unstage?: boolean): Promise<void> {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));

  // Deactivate
  theatre.removeInsertById(`theatre-${actor.id}`, false);
  // Unstage?
  if (unstage) {
    theatre.handleNavItemMouseUp({
      currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
      button: 2,
      ctrlKey: true
    });
  }

  clearEmote(actor);
  return wait(TWEEN_WAIT_TIME);
}


/**
 * Checks whether or not a given {@link Actor}'s insert is active.
 * @param {string} id ID of the {@link Actor}
 */
export function isActorActive(id: string): boolean
/**
 * Checks whether or not a given {@link Actor}'s insert is active.
 * @param {name} name Name of the {@link Actor}
 */
export function isActorActive(name: string): boolean
/**
 * Checks whether or not a given {@link Actor}'s insert is active.
 * @param {Actor} actor {@link Actor} object
 */
export function isActorActive(actor: Actor): boolean
export function isActorActive(arg: unknown): boolean {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));

  const navItem: HTMLElement = theatre.getNavItemById(`theatre-${actor.id}`);
  // They are not staged
  if (!navItem) return false;
  return navItem.classList.contains("theatre-control-nav-bar-item-active");
}