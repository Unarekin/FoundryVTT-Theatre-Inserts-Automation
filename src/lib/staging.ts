/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { coerceActor } from "./coercion";

/**
 * Checks whether or not an {@link Actor} is added to the Theatre Inserts stage.
 * @param {string} id ID fo the {@link Actor} to check
 */
export function isActorStaged(id: string): boolean
/**
 * Checks whether or not an {@link Actor} is added to the Theatre Inserts stage.
 * @param {string} name Name of the {@link Actor} to check
 */
export function isActorStaged(name: string): boolean
/**
 * Checks whether or not an {@link Actor} is added to the Theatre Inserts stage.
 * @param {Actor} actor {@link Actor} object to check
 */
export function isActorStaged(actor: Actor): boolean
export function isActorStaged(arg: unknown): boolean {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDACTOR"));
  return !!theatre.getNavItemById(`theatre-${actor.id}`);
}

/**
 * Stages an {@link Actor} if necessary.
 * @param {string} id ID of the {@link Actor}
 */
export function stageActor(id: string): void
/**
 * Stages an {@link Actor} if necessary.
 * @param {string} name Name of the {@link Actor}
 */
export function stageActor(name: string): void
/**
 * Stages an {@link Actor} if necessary.
 * @param {Actor} actor {@link Actor} object
 */
export function stageActor(actor: Actor): void
export function stageActor(arg: unknown): void {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDACTOR"));

  if (!isActorStaged(actor))
    Theatre.addToNavBar(actor);
}

/**
 * Handles unstaging an {@link Actor}
 * @param {string} id ID of the {@link Actor}
 */
export function unstageActor(id: string): void
/**
 * Handles unstaging an {@link Actor}
 * @param {string} name Name of the {@link Actor}
 */
export function unstageActor(name: string): void
/**
 * Handles unstaging an {@link Actor}
 * @param {Actor} actor {@link Actor} object
 */
export function unstageActor(actor: Actor): void
export function unstageActor(arg: unknown): void {
  const actor = coerceActor(arg);
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREINSERTSMACROS.ERRORS.INVALIDACTOR"));

  if (isActorStaged(actor)) {
    theatre.handleNavItemMouseUp({
      currentTarget: theatre.getNavItemById(`theatre-${actor.id}`),
      button: 2,
      ctrlKey: true
    });
  }
}