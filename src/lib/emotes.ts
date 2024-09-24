import { activateActor, isActorActive } from "./activation";
import { coerceActor } from "./coercion";
import { Flyin, FLYIN_NAMES } from './constants';
import { isNarratorBarActive } from "./narration";

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
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
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
  if (!(actor instanceof Actor)) throw new Error(game.i18n?.localize("THEATREAUTOMATION.ERRORS.INVALIDACTOR"));
  theatre.setUserEmote(game.user?.id, `theatre-${actor.id}`, "emote", "", false);
}

/**
 * Sets the text fly-in style of the insert we are currently speaking as.
 * @param {Flyin} flyin A {@link Flyin} preset
 */
export function setTextFlyin(flyin: Flyin): void
/**
 * Sets the text fly-in style of the insert for a particular {@link Actor}.
 * This {@link Actor}'s insert MUST be active.
 * @param {Flyin} flyin A {@link Flyin} preset
 * @param {string} id {@link Actor} id
 */
export function setTextFlyin(flyin: Flyin, id: string): void
/**
 * Sets the text fly-in style of the insert for a particular {@link Actor}.
 * This {@link Actor}'s insert MUST be active.
 * @param {Flyin} flyin A {@link Flyin} preset
 * @param {string} name {@link Actor} name
 */
export function setTextFlyin(flyin: Flyin, name: string): void
/**
 * Sets the text fly-in style of the insert for a particular {@link Actor}.
 * This {@link Actor}'s insert MUST be active.
 * @param {Flyin} flyin A {@link Flyin} preset
 * @param {Actor} actor {@link Actor}
 */
export function setTextFlyin(flyin: Flyin, actor: Actor): void
/**
 * Sets the text fly-in style of the insert for a particular {@link Actor}.
 * This {@link Actor}'s insert MUST be active.
 * @param {Flyin} flyin A {@link Flyin} preset
 * @param {Token} token {@link Token}
 */
export function setTextFlyin(flyin: Flyin, token: Token): void
export function setTextFlyin(flyin: Flyin, id: "narrator"): void
export function setTextFlyin(flyin: Flyin, arg?: unknown): void {
  if (!FLYIN_NAMES.includes(flyin)) throw new Error(game.i18n?.format("THEATREAUTOMATION.ERRORS.INVALIDFLYIN", { flyin }));
  if (arg === "narrator") {
    theatre.theatreNarrator.setAttribute("textflyin", flyin);
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error("THEATREAUTOMATION.ERRORS.INVALIDACTOR");
    if (!isActorActive(actor)) throw new Error("THEATREAUTOMATION.ERRORS.ACTORNOTACTIVE");
    theatre.setUserEmote(game.user?.id, `theatre-${actor.id}`, "textflyin", flyin, false);
  } else {
    theatre.setUserEmote(game.user?.id, theatre.speakingAs, "textflyin", flyin, false);
  }
}

/**
 * Retrieves the configured text {@link Flyin} for the actor we're currently speaking as.
 */
export function getTextFlyin(): Flyin
/**
 * Retrieves the configured text {@link Flyin} for a given {@link Actor}
 * @param {string} id {@link Actor} id
 */
export function getTextFlyin(id: string): Flyin
/**
 * Retrieves the configured text {@link Flyin} for a given {@link Actor}
 * @param {string} name {@link Actor} name
 */
export function getTextFlyin(name: string): Flyin
/**
 * Retrieves the configured text {@link Flyin} for a given {@link Actor}
 * @param {Actor} actor {@link Actor}
 */
export function getTextFlyin(actor: Actor): Flyin
/**
 * Retrieves the configured text {@link Flyin} for a given {@link Actor}
 * @param {Token} token {@link Token}
 */
export function getTextFlyin(token: Token): Flyin
export function getTextFlyin(arg?: unknown): Flyin {
  if (arg === "narrator") {
    return (theatre.theatreNarrator.getAttribute("textflyin") ?? FLYIN_NAMES[0]) as Flyin;
  } else if (arg) {
    const actor = coerceActor(arg);
    if (!(actor instanceof Actor)) throw new Error("THEATREAUTOMATION.ERRORS.INVALIDACTOR");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return theatre.getInsertById(`theatre-${actor.id}`).textFlyin as Flyin;
  } else if (isNarratorBarActive()) {
    return theatre.theatreNarrator.getAttribute("textflyin") as Flyin;
  } else if (theatre.speakingAs) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (theatre.getInsertById(theatre.speakingAs).textFlyin ?? FLYIN_NAMES[0]) as Flyin;
  } else {
    throw new Error("THEATREAUTOMATION.ERRORS.INVALIDACTOR");
  }
}
