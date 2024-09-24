import { isActorActive } from "./activation";
import { coerceActor } from "./coercion";
import { isNarratorBarActive } from "./narration";

/**
 * Retrieves a list of valid text flyin animation names.
 */
export function getFlyinAnimations(): string[] {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  return Object.keys((<any>Theatre).FLYIN_ANIMS);
}

/** Simply returns if a given string is in our list of flyins */
function isValidFlyin(name: string): boolean {
  return getFlyinAnimations().includes(name);
}

/**
 * Sets the text fly-in style of the insert we are currently speaking as.
 * @param {Flyin} flyin A {@link Flyin} preset
 */
export function setTextFlyin(flyin: string): void
/**
 * Sets the text fly-in style of the insert for a particular {@link Actor}.
 * This {@link Actor}'s insert MUST be active.
 * @param {Flyin} flyin A {@link Flyin} preset
 * @param {string} id {@link Actor} id
 */
export function setTextFlyin(flyin: string, id: string): void
/**
 * Sets the text fly-in style of the insert for a particular {@link Actor}.
 * This {@link Actor}'s insert MUST be active.
 * @param {Flyin} flyin A {@link Flyin} preset
 * @param {string} name {@link Actor} name
 */
export function setTextFlyin(flyin: string, name: string): void
/**
 * Sets the text fly-in style of the insert for a particular {@link Actor}.
 * This {@link Actor}'s insert MUST be active.
 * @param {Flyin} flyin A {@link Flyin} preset
 * @param {Actor} actor {@link Actor}
 */
export function setTextFlyin(flyin: string, actor: Actor): void
/**
 * Sets the text fly-in style of the insert for a particular {@link Actor}.
 * This {@link Actor}'s insert MUST be active.
 * @param {Flyin} flyin A {@link Flyin} preset
 * @param {Token} token {@link Token}
 */
export function setTextFlyin(flyin: string, token: Token): void
export function setTextFlyin(flyin: string, id: "narrator"): void
export function setTextFlyin(flyin: string, arg?: unknown): void {
  if (!isValidFlyin(flyin)) throw new Error(game.i18n?.format("THEATREAUTOMATION.ERRORS.INVALIDFLYIN", { flyin }));
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textflyin", flyin);
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    if (!isActorActive(actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    theatre.setUserEmote(game.user?.id, `theatre-${actor.id}`, "textflyin", flyin, false);
  } else {
    theatre.setUserEmote(game.user?.id, theatre.speakingAs, "textflyin", flyin, false);
  }
}

/**
 * Retrieves the configured text {@link Flyin} for the actor we're currently speaking as.
 */
export function getTextFlyin(): string
/**
 * Retrieves the configured text {@link Flyin} for a given {@link Actor}
 * @param {string} id {@link Actor} id
 */
export function getTextFlyin(id: string): string
/**
 * Retrieves the configured text {@link Flyin} for a given {@link Actor}
 * @param {string} name {@link Actor} name
 */
export function getTextFlyin(name: string): string
/**
 * Retrieves the configured text {@link Flyin} for a given {@link Actor}
 * @param {Actor} actor {@link Actor}
 */
export function getTextFlyin(actor: Actor): string
/**
 * Retrieves the configured text {@link Flyin} for a given {@link Actor}
 * @param {Token} token {@link Token}
 */
export function getTextFlyin(token: Token): string
export function getTextFlyin(arg?: unknown): string {
  if (arg === "narrator") {
    return (theatre.theatreNarrator.getAttribute("textflyin") ?? getFlyinAnimations()[0]);
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    return theatre.getInsertById(`theatre-${actor.id}`).textFlyin;
  } else if (isNarratorBarActive()) {
    return theatre.theatreNarrator.getAttribute("textflyin") ?? "";
  } else if (theatre.speakingAs) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    return (theatre.getInsertById(theatre.speakingAs).textFlyin ?? "");
  } else {
    throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  }
}
