import { currentlyActive, currentlySpeaking } from "./activation";
import { coerceInsert } from "./coercion";
import { InvalidStandingError, InvalidActorError } from "./errors";
import { isNarratorBarActive } from "./narration";

/**
 * Retrieves a list of known text standing animations.
 * @returns {string[]}
 */
export function getStandingAnimations(): string[] {
  return [
    "none",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    ...Object.keys((<any>Theatre).STANDING_ANIMS)
  ];
}

/**
 * Returns whether or not a given string is a valid text standing animation name
 * @param {string} standing 
 * @returns 
 */
export function isValidStandingAnimation(standing: string): boolean {
  return getStandingAnimations().includes(standing);
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
  if (!isValidStandingAnimation(standing)) throw new InvalidStandingError(standing);
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textstanding", standing);
  } else if (arg) {
    const insert = coerceInsert(arg);
    if (!insert) throw new InvalidActorError();
    theatre.setUserEmote(game.user?.id, insert.imgId, "textstanding", standing, false);
  } else if (theatre.speakingAs) {
    // Use current
    theatre.setUserEmote(game.user?.id, theatre.speakingAs, "textstanding", standing, false);
  } else if (isNarratorBarActive()) {
    theatre.theatreNarrator.setAttribute("textstanding", standing);
  } else {
    throw new InvalidActorError();
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
    const insert = coerceInsert(arg);
    if (!insert) throw new InvalidActorError();
    return insert.textStanding ?? "";
  } else if (isNarratorBarActive()) {
    return theatre.theatreNarrator.getAttribute("textstanding") as string;
  } else {
    const speaking = currentlySpeaking();
    const active = currentlyActive();
    if (speaking) return speaking.textStanding ?? "";
    else if (active.length === 1) return active[0].textStanding ?? "";
    else throw new InvalidActorError();
  }
}
