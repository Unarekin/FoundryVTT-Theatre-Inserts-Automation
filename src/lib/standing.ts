import { currentlySpeaking, isActorActive } from "./activation";
import { coerceActor } from "./coercion";
import { isNarratorBarActive } from "./narration";

/**
 * Retrieves a list of known text standing animations.
 * @returns {string[]}
 */
export function getStandingAnimations(): string[] {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  return Object.keys((<any>Theatre).STANDING_ANIMS);
}

/**
 * Will set the text standing for the currently active {@link Actor}
 * @param {string} standing Text standing value
 */
export function setTextStanding(standing: string): void
/**
 * Will set the text standing for a given {@link Actor}
 * @param {string} standing Text standing value
 * @param {string} id {@link Actor} id
 */
export function setTextStanding(standing: string, id: string): void
/**
 * Will set the text standing for a given {@link Actor}
 * @param {string} standing Text standing value
 * @param name 
 */
export function setTextStanding(standing: string, name: string): void
/**
  * Will set the text standing for a given {@link Actor}
 * @param {string} standing Text standing value
 * @param actor 
 */
export function setTextStanding(standing: string, actor: Actor): void
/**
 * Will set the text standing for a given {@link Actor}
 * @param {string} standing Text standing value
 * @param token 
 */
export function setTextStanding(standing: string, token: Token): void
/**
 * Will set the text standing for the narrator
 * @param {string} standing Text standing value
 * @param {"narrator"} name 
 */
export function setTextStanding(standing: string, name: "narrator"): void
export function setTextStanding(standing: string, arg?: unknown): void {
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textstanding", standing);
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    if (!isActorActive(actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    theatre.setUserEmote(game.user?.id, `theatre-${actor.id}`, "textstanding", standing, false);
  } else if (theatre.speakingAs) {
    // Use current
    theatre.setUserEmote(game.user?.id, theatre.speakingAs, "textstanding", standing, false);
  } else if (isNarratorBarActive()) {
    theatre.theatreNarrator.setAttribute("textstanding", standing);
  } else {
    throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"))
  }
}


/**
 * Retrieves the currently configured text standing for the active {@link Actor}
 */
export function getTextStanding(): string
/**
 * Retrieves the currently configured text standing for a given {@link Actor}
 * @param {string} id 
 */
export function getTextStanding(id: string): string
/**
 * Retrieves the currently configured text standing for a given {@link Actor}
 * @param {string} name 
 */
export function getTextStanding(name: string): string
/**
 * Retrieves the currently configured text standing for a given {@link Actor}
 * @param {Actor} actor {@link Actor}
 */
export function getTextStanding(actor: Actor): string
/**
 * Retrieves the currently configured text standing for a given {@link Actor}
 * @param {Token} token {@link Token}
 */
export function getTextStanding(token: Token): string
/**
 * Retrieves the currently configured text standing for the narrator.
 */
export function getTextStanding(name: "narrator"): string
export function getTextStanding(arg?: unknown): string {
  if (arg === "narrator") {
    return theatre.theatreNarrator.getAttribute("textstanding") as string;
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return theatre.getInsertById(`theatre-${actor.id}`).textStanding as string;
  } else if (isNarratorBarActive()) {
    return theatre.theatreNarrator.getAttribute("textstanding") as string;
  } else {
    const actor = currentlySpeaking();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (actor instanceof Actor) return theatre.getInsertById(`theatre-${actor.id}`).textStanding as string;
    throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  }
}
